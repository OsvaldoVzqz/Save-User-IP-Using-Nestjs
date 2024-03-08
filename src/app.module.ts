import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IpTrackingMiddleware } from './middleware/ip-tracking.middleware';
import { BatchLoggerService } from './services/batch-logger/batch-logger.service';
import { PrismaService } from './services/prisma.services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BatchLoggerService, PrismaService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpTrackingMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
