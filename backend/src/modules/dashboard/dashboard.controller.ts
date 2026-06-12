import {
  Request,
  Response,
  NextFunction,
} from "express";

import { DashboardService } from "./dashboard.service";

export class DashboardController {
  private service =
    new DashboardService();

  getMetrics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const metrics =
        await this.service.getMetrics();

      return res.json(metrics);
    } catch (error) {
      next(error);
    }
  };
}