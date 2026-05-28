import { Controller } from '@nestjs/common';
import { ActorService } from './actor.service';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  // @Post()
  // create(@Body() dto: CreateActorDto) {
  //   return this.actorService.create(dto);
  // }
}
