import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto, MovieResponse } from './dto/movie.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get all movies',
    description: 'Returns a list of all movies in the database.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of movies retrieved successfully.',
    type: [MovieResponse],
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Get movie by ID',
    description: 'Returns a single movie based on its ID.',
  })
  @ApiOkResponse({
    description: 'Movie retrieved successfully.',
    type: MovieResponse,
  })
  @ApiNotFoundResponse({
    description: 'Movie with the specified ID not found.',
    example: {
      status: HttpStatus.NOT_FOUND,
      message: 'Movie with ID 123 not found',
      timestamp: '2023-08-18T12:34:56.789Z',
      path: '/movies/123',
    },
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({
    summary: 'Create a new movie',
  })
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
