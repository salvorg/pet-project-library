import { Entity } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
