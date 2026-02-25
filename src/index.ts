import express from 'express';
import compression from "compression";
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { webRouter } from './routes/web/index.js';
import { apiContactRoute } from './routes/api/contact-route.js';
import { errorHandler } from './middleware/error-handler.js';
import { handlerServeNotFound } from "./web/not-found.js";
import { handlerServeErrorPage } from './web/error-page.js';

const app = express();
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(compression());
app.use(express.json());
app.use(express.static(join(__dirname, '../public'), {
    maxAge: process.env.NODE_ENV === 'production' ? 1000 * 60 * 60 * 24 * 30 : 0
}));
app.disable('x-powered-by');

app.set("view engine", "pug");
app.set("views", join(__dirname, "../views"));

// web views
app.use("/", webRouter);

// contact form api
app.use("/api/contact", apiContactRoute);

// if api error
app.use(errorHandler);
// specifically catches 404
app.use(handlerServeNotFound);
// any other errors
app.use(handlerServeErrorPage);

export default app;
