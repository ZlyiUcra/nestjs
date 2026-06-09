import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.log('CRON executes every 10 seconds');
  }
  @Interval(1000)
  handleInterval() {
    this.logger.log('Interval ask every second');
  }
  @Timeout(5000)
  handleTimeout() {
    this.logger.log("Timout task executes 5 seconds after app's start");
  }
}
