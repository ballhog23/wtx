import express from "express";
import { asyncHandler } from "../../lib/helpers.js";
import { handlerServeIndex } from "../../web/index.js";
import { handlerServeContact } from "../../web/contact.js";
import { handlerServeAbout } from "../../web/about.js";

export const webRouter = express.Router();

webRouter.get('/', asyncHandler(handlerServeIndex));
webRouter.get('/about', asyncHandler(handlerServeAbout));
webRouter.get('/contact', asyncHandler(handlerServeContact));
