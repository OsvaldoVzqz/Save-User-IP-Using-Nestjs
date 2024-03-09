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
    this.dataStore.get(userId).add(ip);
  }

  private async writeBatchToDatabase(): Promise<void> {
    const records = [];

    this.dataStore.forEach((ips, userId) => {
      ips.forEach((ip) => {
        records.push({
          userId:parseInt(userId),
          ip,
          createdAt: new Date(), 
        });
      });
    });

    try {
      await this.prismaService.iPRecord.createMany({
        data: records,
        skipDuplicates: true, 
      });
    } catch (error) {
      console.error('Error al escribir en la base de datos', error);
    }

    this.dataStore.clear();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.writeBatchToDatabase();
  }
}

