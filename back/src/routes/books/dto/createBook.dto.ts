import { Entity } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class CreateBookDto {
  @IsNotEmpty()
  authors: string;

  @IsNotEmpty()
  genres: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  availableCopies: string;

  @IsNotEmpty()
  @IsString()
  publisher: string;
}
