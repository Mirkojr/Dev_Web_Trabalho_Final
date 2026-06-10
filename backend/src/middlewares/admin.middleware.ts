import {
  NextFunction,
  Request,
  Response,
} from "express";

import { HttpError } from "../utils/http-error";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "ADMIN") {
    throw new HttpError(
      403,
      "Forbidden"
    );
  }

  next();
}