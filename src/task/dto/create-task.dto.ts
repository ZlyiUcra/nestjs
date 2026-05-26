import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  IsArray,
  IsEnum,
  Matches,
  MinLength,
  IsUrl,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  title!: string;

  @IsString({
    message: "'description' must be a string",
  })
  @IsOptional()
  description?: string;

  @IsInt({ message: "'priority' must be an integer" })
  @IsPositive({
    message: "'priority' must be a positive number",
  })
  @IsOptional()
  priority?: number;

  @IsArray({ message: "'tags' must be an array of strings" })
  @IsEnum(TaskTag, {
    each: true,
    message: "Invalid tag's value. ",
  })
  @IsNotEmpty({ each: true, message: "Each 'tag' must not be empty" })
  @IsOptional()
  tags?: TaskTag[];

  @MinLength(6, { message: "'password' must be at least 6 characters long" })
  @IsString({ message: "'password' must be a string" })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message:
      "'password' must contain at least one uppercase letter and one number",
  })
  password!: string;

  @IsUrl(
    {},
    {
      message: "'websiteUrl' must be a valid URL",
    },
  )
  websiteUrl?: string;
}
