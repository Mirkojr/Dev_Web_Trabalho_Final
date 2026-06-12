import { Request } from "express";

export function getParamId(
  req: Request
): string {
  return String(req.params.id);
}