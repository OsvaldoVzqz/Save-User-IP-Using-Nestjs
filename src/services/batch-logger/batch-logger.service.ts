import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma.services';

@Injectable()
export class BatchLoggerService implements OnModuleDestroy {
  private dataStore: Map<string, Set<string>> = new Map();

  constructor(private prismaService: PrismaService) {
    setInterval(() => {
      this.writeBatchToDatabase();
    }, 60000);
  }

  public logRequest(userId: string, ip: string): void {
    if (!this.dataStore.has(userId)) {
      this.dataStore.set(userId, new Set());
    }
    this.dataStore.get(userId)?.add(ip);
  }

  private async writeBatchToDatabase(): Promise<void> {
    const records = [];

    this.dataStore.forEach((ips, userId) => {
      ips.forEach((ip) => {
        records.push({
          userId: parseInt(userId, 10), 
          createdAt: new Date(),
        });
      });
    });

    if (records.length > 0) {
      try {
        await this.prismaService.iPRecord.createMany({
          data: records,
          skipDuplicates: true,
        });
      } catch (error) {
        if (error.code === 'P2003') {
          console.error('Foreign key constraint failed, userId not found in the database.');
        } else {
          console.error('Error writing to the database', error);
        }
      }
    }

    this.dataStore.clear();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.writeBatchToDatabase();
  }
}

