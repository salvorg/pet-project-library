import { Entity } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
