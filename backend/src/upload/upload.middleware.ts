import type { Request, Response, NextFunction } from "express";
import type { UploadFile } from "../storage/types";

export function adaptUploadFile(fieldName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const file = (req as any).file;

    if (!file) {
      return next();
    }

    const uploadFile: UploadFile = {
      buffer: file.buffer,
      originalName: file.originalname,
      mimeType: file.mimetype,
    };

    (req as any).uploadFile = uploadFile;

    next();
  };
}