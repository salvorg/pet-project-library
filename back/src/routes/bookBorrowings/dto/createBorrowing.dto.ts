import { Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class CreateBorrowingDto {
  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  book: number;
}
