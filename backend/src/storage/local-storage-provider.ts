import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import {
  AVATARS_DIRECTORY,
  RECIPES_DIRECTORY,
  UPLOADS_DIRECTORY,
} from "../config/upload";

import type { StorageProvider } from "./storage-provider";
import type {
  StoredFile,
  UploadFile,
  UploadFolder,
} from "./types";

export class LocalStorageProvider implements StorageProvider {
  async save(
    file: UploadFile,
    folder: UploadFolder,
  ): Promise<StoredFile> {
    const filename = this.buildFilename();

    const filepath = this.resolveFilePath(folder, filename);

    await fs.writeFile(filepath, file.buffer);

    return {
      filename,
      url: this.buildFileUrl(folder, filename),
    };
  }

  async delete(fileUrl: string): Promise<void> {
    try {
      const filepath = this.resolveFilePathFromUrl(fileUrl);
      await fs.unlink(filepath);
    } catch {
      // ignore
    }
  }

  // -------------------------
  // filename (SEM extensão)
  // -------------------------
  private buildFilename(): string {
    return `${randomUUID()}.webp`;
  }

  // -------------------------
  // URL pública
  // -------------------------
  private buildFileUrl(
    folder: UploadFolder,
    filename: string,
  ): string {
    return `/uploads/${folder}/generated/${filename}`;
  }

  // -------------------------
  // diretório físico
  // -------------------------
  private resolveDirectory(folder: UploadFolder): string {
    switch (folder) {
      case "recipes":
        return RECIPES_DIRECTORY;

      case "avatars":
        return AVATARS_DIRECTORY;
    }
  }

  private resolveFilePath(
    folder: UploadFolder,
    filename: string,
  ): string {
    return path.join(
      this.resolveDirectory(folder),
      filename,
    );
  }

  // -------------------------
  // delete por URL
  // -------------------------
  private resolveFilePathFromUrl(url: string): string {
    const relative = url.replace("/uploads/", "");

    return path.join(
      UPLOADS_DIRECTORY,
      relative,
    );
  }
}