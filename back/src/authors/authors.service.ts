import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { CreateAuthorDto } from './dto/createAuthor.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
  ) {}

  async getAll(): Promise<Author[]> {
    const authors = await this.authorsRepo.find({ relations: ['books'] });

    if (!authors.length) {
      throw new NotFoundException('No authors found!');
    }
    return authors;
  }

  async getOne(id: number): Promise<Author> {
    const author = await this.authorsRepo.findOne({ where: { id }, relations: ['books'] });

    if (!author) {
      throw new NotFoundException('Author not found!');
    }
    return author;
  }

  async createAuthor(body: CreateAuthorDto, file: Express.Multer.File): Promise<Author> {
    const existingAuthor = await this.authorsRepo.findOne({
      where: { firstName: body.firstName, lastName: body.lastName },
    });

    if (existingAuthor) {
      throw new BadRequestException(`${body.firstName} ${body.lastName} already exists!`);
    }

    const author = await this.authorsRepo.create({
      firstName: body.firstName,
      lastName: body.lastName,
      description: body.description,
      image: file ? '/uploads/authors/images/' + file.filename : null,
    });
    return await this.authorsRepo.save(author);
  }

  async updateAuthor(body: CreateAuthorDto, file: Express.Multer.File, id: number): Promise<Author> {
    const author = await this.getAuthorById(id);

    author.firstName = body.firstName;
    author.lastName = body.lastName;
    author.description = body.description;
    author.image = file ? '/uploads/authors/images/' + file.filename : null;

    return this.authorsRepo.save(author);
  }

  async removeAuthor(id: number): Promise<{ message: string }> {
    await this.getAuthorById(id);
    await this.authorsRepo.delete(id);
    return { message: 'Author successfully deleted' };
  }

  private async getAuthorById(id: number): Promise<Author> {
    const author = await this.authorsRepo.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException("Author that you've wanted to update was not found!");
    }
    return author;
  }
}
