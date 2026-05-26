import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
export class UpdateTaskDto {
  @IsString({
    message: "'title' must be a string",
  })
  @IsNotEmpty({
    message: "'title' must not be empty",
  })
  @Length(2, 40, {
    message: "'title' must be between 2 and 40 characters",
  })
  title!: string;

  @IsBoolean({
    message: "'isCompleted' must be a boolean",
  })
  isCompleted!: boolean;
}
