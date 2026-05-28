import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  // constructor(
  //   @InjectRepository(MovieEntity)
  //   private readonly movieRepository: Repository<MovieEntity>,
  //   @InjectRepository(ActorEntity)
  //   private readonly actorRepository: Repository<ActorEntity>,
  //   @InjectRepository(MoviePosterEntity)
  //   private readonly moviePosterRepository: Repository<MoviePosterEntity>,
  // ) {}
  // async findAll(): Promise<MovieEntity[]> {
  //   return await this.movieRepository.find({
  //     where: { isAvailable: true },
  //     order: { createdAt: 'desc' },
  //     //select: { id: true, title: true, releaseYear: true },
  //   });
  // }
  // async findById(id: string): Promise<MovieEntity> {
  //   const movie = await this.movieRepository.findOne({
  //     where: {
  //       id,
  //     },
  //     relations: { actors: true },
  //   }); // await this.movieRepository.findOneBy({ id });
  //   if (!movie) throw new NotFoundException('Movie not found');
  //   return movie;
  // }
  // async create(dto: MovieDto): Promise<MovieEntity> {
  //   const { title, releaseYear, imageUrl, actorIds } = dto;
  //   const actors = await this.actorRepository.find({
  //     where: { id: In(actorIds) },
  //   });
  //   if (!actors || !actors.length)
  //     throw new NotFoundException('Ome or more actors not found');
  //   let poster: MoviePosterEntity | null = null;
  //   if (imageUrl) {
  //     poster = this.moviePosterRepository.create({ url: imageUrl });
  //     await this.moviePosterRepository.save(poster);
  //   }
  //   const movie = this.movieRepository.create({
  //     title,
  //     releaseYear,
  //     poster,
  //     actors,
  //   });
  //   return await this.movieRepository.save(movie);
  // }
  // async update(id: string, dto: MovieDto): Promise<boolean> {
  //   const movie = await this.findById(id);
  //   Object.assign(movie, dto);
  //   await this.movieRepository.save(movie);
  //   return true;
  // }
  // async delete(id: string): Promise<string> {
  //   const movie = await this.findById(id);
  //   await this.movieRepository.remove(movie);
  //   return id;
  // }
}
