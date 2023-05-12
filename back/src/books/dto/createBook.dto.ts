import { Entity } from 'typeorm';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class CreateBookDto {
  @IsNotEmpty()
  @IsArray()
  authors: number[];

  @IsNotEmpty()
  @IsArray()
  genres: number[];

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  availableCopies: number;
}
