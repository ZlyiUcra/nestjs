import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }
}
