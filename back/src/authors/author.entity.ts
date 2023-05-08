import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string | null;
}
