import { Entity } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class CreateBookDto {
  authors: number[] | null;
  genres: number[] | null;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  availableCopies: number;

  @IsNotEmpty()
  @IsString()
  publisher: string;
}
