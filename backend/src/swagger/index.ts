import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { Router } from "express";

import { swaggerOptions } from "./options";

const router = Router();

const spec = swaggerJsdoc(swaggerOptions);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(spec));

export default router;