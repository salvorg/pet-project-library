import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, BeforeInsert } from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';

@Entity()
export class BookBorrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book' })
  book: Book;

  @Column()
  borrowDate: Date;

  @Column()
  expiredDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;

  @BeforeInsert()
  async calculateExpiredDate() {
    this.expiredDate = new Date(this.borrowDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  }
}
