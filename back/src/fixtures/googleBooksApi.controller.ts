import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../routes/authors/author.entity';
import { Repository } from 'typeorm';
import { Book } from '../routes/books/book.entity';
import { Genre } from '../routes/genres/genre.entity';
import axios from 'axios';
import { config } from 'dotenv';

config();

const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

@Controller('books-api')
export class GoogleBooksApiController {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genresRepo: Repository<Genre>,
  ) {}

  @Get()
  async getBooks() {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:J.K.+Rowling&key=${apiKey}`,
    );

    const author1 = await this.authorsRepo.create({
      name: 'J.K. Rowling',
      books: null,
      image: null,
      description:
        "Joanne Rowling best known by her pen name J. K. Rowling, is a British author and philanthropist. She wrote Harry Potter, a seven-volume children's fantasy series published from 1997 to 2007. The series has sold over 600 million copies, been translated into 84 languages, and spawned a global media franchise including films and video games. The Casual Vacancy (2012) was her first novel for adults. She writes Cormoran Strike, an ongoing crime fiction series, under the alias Robert Galbraith.",
    });
    await this.authorsRepo.save(author1);

    const response2 = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:Jack+London&key=${apiKey}`,
    );

    const author2 = await this.authorsRepo.create({
      name: 'Jack London',
      books: null,
      image: null,
      description:
        'John Griffith Chaney (January 12, 1876 – November 22, 1916), better known as Jack London, was an American novelist, journalist and activist. A pioneer of commercial fiction and American magazines, he was one of the first American authors to become an international celebrity and earn a large fortune from writing. He was also an innovator in the genre that would later become known as science fiction.',
    });
    await this.authorsRepo.save(author2);

    const response3 = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:Mark+Twain&key=${apiKey}`,
    );

    const author3 = await this.authorsRepo.create({
      name: 'Jack London',
      books: null,
      image: null,
      description: '',
    });
    await this.authorsRepo.save(author3);

    const response4 = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:Haruki+Murakami&key=${apiKey}`,
    );

    const author4 = await this.authorsRepo.create({
      name: 'Haruki Murakami',
      books: null,
      image: null,
      description:
        "Haruki Murakami (村上 春樹, Murakami Haruki, born January 12, 1949) is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan and internationally, with his work translated into 50 languages and having sold millions of copies outside Japan. He has received numerous awards for his work, including the Gunzo Prize for New Writers, the World Fantasy Award, the Frank O'Connor International Short Story Award, the Franz Kafka Prize, and the Jerusalem Prize.",
    });
    await this.authorsRepo.save(author4);

    const createBooksFromApi = async (response) => {
      for (let i = 0; i < response.data.items.length; i++) {
        const title = response.data.items[i].volumeInfo.title;
        const description = response.data.items[i].volumeInfo.description;
        const publisher = response.data.items[i].volumeInfo.publisher;
        const writers = response.data.items[i].volumeInfo.authors;
        // const genres = response.data.items[i].volumeInfo.categories;

        const authors = [];
        for (let i = 0; i < writers.length; i++) {
          const result = await this.authorsRepo.findOne({ where: { name: writers[i] } });
          authors.push(result);
        }

        if (title && description && publisher) {
          const existingBook = await this.booksRepo.findOne({ where: { title, description, publisher } });
          if (existingBook) {
            continue;
          }
          const book = await this.booksRepo.create({
            authors,
            title,
            description,
            publisher,
            availableCopies: Math.floor(Math.random() * 18),
          });

          await this.booksRepo.save(book);
        }
      }
    };

    await createBooksFromApi(response);
    await createBooksFromApi(response2);
    await createBooksFromApi(response3);
    await createBooksFromApi(response4);

    return response.data.items[0].volumeInfo;
  }
}
