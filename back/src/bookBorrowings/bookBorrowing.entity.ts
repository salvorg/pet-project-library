import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { JoinColumn } from 'typeorm/browser';
import { Book } from '../books/book.entity';

@Entity()
export class BookBorrowingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book' })
  book: Book;

  @CreateDateColumn()
  borrowDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;
}
