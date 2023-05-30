import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';

@Entity()
export class BookBorrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'borrower' })
  borrower: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'borrowed' })
  borrowed: Book;

  @CreateDateColumn()
  borrowDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;
}
