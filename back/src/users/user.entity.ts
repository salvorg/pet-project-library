import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Exclude } from 'class-transformer';

const SALT_WORK_FACTOR = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  token: string;

  @Column({
    default: 'user',
    enum: ['user', 'admin'],
  })
  role: string;

  @Column({ nullable: true })
  googleId: string;

  async generateToken() {
    this.token = crypto.randomUUID();
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
