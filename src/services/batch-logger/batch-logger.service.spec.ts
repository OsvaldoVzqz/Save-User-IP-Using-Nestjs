import { Test, TestingModule } from '@nestjs/testing';
import { BatchLoggerService } from './batch-logger.service';
import { PrismaService } from '../prisma.services';

describe('BatchLoggerService', () => {
  let service: BatchLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchLoggerService, PrismaService,],
    }).compile();

    service = module.get<BatchLoggerService>(BatchLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


