import { IsOptional, IsString, Max } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Max(100)
  title: string;

  @IsString()
  @Max(1000)
  desc: string;

  @IsString()
  @Max(5000)
  content: string;

  @IsString()
  @IsOptional()
  categories: string;
}
