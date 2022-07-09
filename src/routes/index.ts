import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

(() => {
    fs.readdirSync(path.resolve(__dirname))
        .filter(file => file.split('.')[1] === 'routes')
        .forEach(async file => {
            const route = (await import(path.resolve(`${__dirname}/${file}`))).default;
            router.use(`/${file.split('.')[0]}`, route);
        });
})();

export default router;