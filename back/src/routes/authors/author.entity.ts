import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Book, (book) => book.authors, { nullable: true })
  books: Book[] | null;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string | null;
}
