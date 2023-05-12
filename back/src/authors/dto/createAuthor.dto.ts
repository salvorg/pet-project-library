import { Entity } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
