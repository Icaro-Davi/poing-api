import express, { Express } from 'express';

const BodyParserMiddleware = (app: Express) => {
    app.use(express.json());
}

export default { middleware: BodyParserMiddleware, priority: 2 };