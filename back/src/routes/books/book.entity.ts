import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../authors/author.entity';
import { Genre } from '../genres/genre.entity';
import { BookBorrowing } from '../bookBorrowings/bookBorrowing.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Author, (author) => author.books, { nullable: true })
  @JoinTable()
  authors: Author[] | null;

  @ManyToMany(() => Genre, (genre) => genre.books, { nullable: true })
  @JoinTable()
  genres: Genre[] | null;

  @OneToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.book)
  bookBorrowings: BookBorrowing[];

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string | null;

  @Column({ default: 0 })
  availableCopies: number;

  @Column({ nullable: true })
  publisher: string;
}
