import fs from 'fs';
import { Express } from 'express';
import path from 'path';

type MiddlewareImportType = { middleware: Function, priority?: number, name: string };

export class Middleware {
    private static middlewareList: MiddlewareImportType[][] = [];
    private static middlewareFolderPath = path.resolve(`${__dirname}`);

    static register(middleware: Function, middlewareName: string, priority?: number) {
        const middlewareItem = { middleware, priority: priority || this.middlewareList.length - 1, name: middlewareName };
        if (middlewareItem.priority < 1) {
            !this.middlewareList[0] && (this.middlewareList[0] = []);
            this.middlewareList[0].push(middlewareItem);
        } else {
            !this.middlewareList[middlewareItem.priority] && (this.middlewareList[middlewareItem.priority] = []);
            this.middlewareList[middlewareItem.priority].push(middlewareItem);
        }
    }

    private static findMiddlewareFiles() {
        return fs.readdirSync(this.middlewareFolderPath)
            .filter(file => file.split('.')[1] === 'middleware');
    }

    private static async importAllMiddleware() {
        await this.findMiddlewareFiles()
            .forEach(async mFile => {
                const { middleware, priority } = (await import(`${this.middlewareFolderPath}/${mFile}`)).default as MiddlewareImportType;
                this.register(middleware, mFile.split('.')[0], priority);
            });
    }

    static async loadAllMiddleware(app: Express) {
        try {
            console.group('[APP] Middleware List.');
            await this.importAllMiddleware();
            this.middlewareList.flat().forEach(_ => {
                _.middleware(app);
                _.priority
                    ? console.log(`- - [Middleware ${_.name}] Loaded with priority ${_.priority}.`)
                    : console.log(`- - [Middleware ${_.name}] loaded without priority.`);
            });
            console.groupEnd();
        } catch (error) {
            console.error('[Middleware] Error on load middleware');
            throw error;
        }
    }
}

export default async (app: Express) => {
    await Middleware.loadAllMiddleware(app);
};