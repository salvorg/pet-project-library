import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../routes/authors/author.entity';
import { Repository } from 'typeorm';
import { Genre } from '../routes/genres/genre.entity';
import { Book } from '../routes/books/book.entity';

@Injectable()
export class BooksFixtures {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
    @InjectRepository(Genre)
    private readonly genresRepo: Repository<Genre>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
  ) {}

  async createBooks() {
    const authors = await this.authorsRepo.find({ where: { name: 'J.K. Rowling' } });
    const genres = await this.genresRepo.find({ where: { name: 'Fantasy novels' } });
    const book1 = await this.booksRepo.create({
      authors,
      genres,
      title: "Harry Potter and the Philosopher's Stone",
      description:
        "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school and with the help of his friends, Ron Weasley and Hermione Granger, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.",
      availableCopies: 28,
      publisher: 'Bloomsbury',
      image: "fixtures/books/Harry_Potter_and_the_Philosopher's_Stone_Book_Cover.jpg",
    });
    await this.booksRepo.save(book1);

    const book2 = await this.booksRepo.create({
      authors,
      genres,
      title: 'Harry Potter and the Chamber of Secrets',
      description:
        'Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series. The plot follows Harry\'s second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the school\'s corridors warn that the "Chamber of Secrets" has been opened and that the "heir of Slytherin" would kill all pupils who do not come from all-magical families. These threats are found after attacks that leave residents of the school petrified. Throughout the year, Harry and his friends Ron and Hermione investigate the attacks.',
      availableCopies: 28,
      publisher: 'Bloomsbury',
      image: 'fixtures/books/Harry_Potter_and_the_Chamber_of_Secrets.jpg',
    });
    await this.booksRepo.save(book2);
  }
}
