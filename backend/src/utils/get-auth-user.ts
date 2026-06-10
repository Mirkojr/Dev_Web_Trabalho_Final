import { Request } from "express";
import createHttpError from "http-errors";

export function getAuthUser(req: Request) {
  if (!req.user) {
    throw createHttpError(401, "Unauthorized");
  }

  return req.user;
}