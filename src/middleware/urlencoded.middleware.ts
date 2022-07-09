import express, { Express } from 'express';

const urlEncodedMiddleware = (app: Express) => {
    app.use(express.urlencoded({ extended: true }));
}

export default { middleware: urlEncodedMiddleware, priority: 2 };