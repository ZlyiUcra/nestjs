import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('CRON executes every 10 seconds');
  }
  @Interval(1000)
  handleInterval() {
    console.log('Interval ask every second');
  }
  @Timeout(5000)
  handleTimeout() {
    console.log("Timout task executes 5 seconds after app's start");
  }
}
