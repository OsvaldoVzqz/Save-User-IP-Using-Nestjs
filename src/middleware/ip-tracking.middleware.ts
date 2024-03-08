import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BatchLoggerService } from '../services/batch-logger/batch-logger.service';

@Injectable()
export class IpTrackingMiddleware implements NestMiddleware {
  constructor(private batchLoggerService: BatchLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userIp = req.ip || req.connection.remoteAddress;
    const userId = this.getUserIdFromRequest(req);

    if (!userId) {
      console.log('No userId found, not tracking IP.');
      return next();
    }


    this.batchLoggerService.logRequest(userId, userIp);
    console.log(`Tracking User ID: ${userId} from IP: ${userIp}`);
    next();
  }

  private getUserIdFromRequest(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }
}
