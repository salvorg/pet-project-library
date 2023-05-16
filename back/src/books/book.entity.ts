import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../authors/author.entity';
import { Genre } from '../genres/genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Author[];

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string | null;

  @Column({ default: 0 })
  availableCopies: number;
}
