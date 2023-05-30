import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../routes/authors/author.entity';

@Injectable()
export class AuthorsFixtures {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
  ) {}

  async createAuthors() {
    const author2 = await this.authorsRepo.create({
      name: 'Frederic Beigbeder',
      description:
        'Frédéric Beigbeder (French: [fʁedeʁik bɛɡbede]; born 21 September 1965) is a French writer, literary critic and television presenter. He won the Prix Interallié in 2003 for his novel Windows on the World and the Prix Renaudot in 2009 for his book A French Novel. He is also the creator of the Flore and Sade Awards. In addition, he is the executive director of Lui, a French adult entertainment magazine.',
      image: '',
    });
    await this.authorsRepo.save(author2);

    const author3 = await this.authorsRepo.create({
      name: 'Haruki Murakami',
      description:
        "Haruki Murakami (村上 春樹, Murakami Haruki, born January 12, 1949[1]) is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan and internationally, with his work translated into 50 languages[2] and having sold millions of copies outside Japan.[3][4] He has received numerous awards for his work, including the Gunzo Prize for New Writers, the World Fantasy Award, the Frank O'Connor International Short Story Award, the Franz Kafka Prize, and the Jerusalem Prize.",
      image: '',
    });
    await this.authorsRepo.save(author3);

    const author4 = await this.authorsRepo.create({
      name: 'Nick Perumov',
      description:
        'Nick Perumov (Russian: Ник Перумов) is the pen name of Nikolay Daniilovich Perumov (Russian: Николай Даниилович Перумов; born 21 November 1963), a Russian fantasy and science fiction writer.',
      image: '',
    });
    await this.authorsRepo.save(author4);

    const author5 = await this.authorsRepo.create({
      name: 'Fyodor Dostoevsky',
      description:
        'Fyodor Mikhailovich Dostoevsky[a] (UK: /ˌdɒstɔɪˈɛfski/,[1] US: /ˌdɒstəˈjɛfski, ˌdʌs-/;[2] Russian: pre-1918: Ѳедоръ Михайловичъ Достоевскій; post-1918: Фёдор Михайлович Достоевский[b], tr. Fyódor Mikháylovich Dostoyévskiy, IPA: [ˈfʲɵdər mʲɪˈxajləvʲɪdʑ dəstɐˈjefskʲɪj] (listen); 11 November 1821 – 9 February 1881[3][c]), sometimes transliterated as Dostoyevsky, was a Russian novelist, short story writer, essayist and journalist. Numerous literary critics regard him as one of the greatest novelists in all of world literature, as many of his works are considered highly influential masterpieces.[4]',
      image: '',
    });
    await this.authorsRepo.save(author5);

    const author1 = await this.authorsRepo.create({
      name: 'Roger Zelazny',
      description:
        'Roger Joseph Zelazny (May 13, 1937 – June 14, 1995)[2] was an American poet and writer of fantasy and science fiction short stories and novels, best known for The Chronicles of Amber. He won the Nebula Award three times (out of 14 nominations) and the Hugo Award six times (also out of 14 nominations), including two Hugos for novels: the serialized novel ...And Call Me Conrad (1965), subsequently published under the title This Immortal (1966) and then the novel Lord of Light (1967).[3]',
      image: '',
    });
    await this.authorsRepo.save(author1);

    const author6 = await this.authorsRepo.create({
      name: 'Isaac Asimov',
      description:
        'Isaac Asimov (/ˈæzɪmɒv/ AZ-ih-mov;[b] c. January 2,[a] 1920 – April 6, 1992) was an American writer and professor of biochemistry at Boston University. During his lifetime, Asimov was considered one of the "Big Three" science fiction writers, along with Robert A. Heinlein and Arthur C. Clarke.[2] A prolific writer, he wrote or edited more than 500 books. He also wrote an estimated 90,000 letters and postcards.[c] Best known for his hard science fiction, Asimov also wrote mysteries and fantasy, as well as much non-fiction.',
      image: '',
    });
    await this.authorsRepo.save(author6);

    const author7 = await this.authorsRepo.create({
      name: 'Jules Verne',
      description:
        'Jules Gabriel Verne (/vɜːrn/;[1][2] French: [ʒyl gabʁijɛl vɛʁn]; 8 February 1828 – 24 March 1905[3]) was a French novelist, poet, and playwright. His collaboration with the publisher Pierre-Jules Hetzel led to the creation of the Voyages extraordinaires,[3] a series of bestselling adventure novels including Journey to the Center of the Earth (1864), Twenty Thousand Leagues Under the Seas (1870), and Around the World in Eighty Days (1872). His novels, always well documented, are generally set in the second half of the 19th century, taking into account the technological advances of the time.',
      image: '',
    });
    await this.authorsRepo.save(author7);

    const author8 = await this.authorsRepo.create({
      name: 'Jack London',
      description:
        'John Griffith Chaney[1] (January 12, 1876 – November 22, 1916), better known as Jack London,[2][3][4][5] was an American novelist, journalist and activist. A pioneer of commercial fiction and American magazines, he was one of the first American authors to become an international celebrity and earn a large fortune from writing.[6] He was also an innovator in the genre that would later become known as science fiction.[7]\n' +
        '\n' +
        'London was part of the radical literary group "The Crowd" in San Francisco and a passionate advocate of animal rights, workers’ rights and socialism.[8][9] London wrote several works dealing with these topics, such as his dystopian novel The Iron Heel, his non-fiction exposé The People of the Abyss, War of the Classes, and Before Adam.\n' +
        '\n' +
        'His most famous works include The Call of the Wild and White Fang, both set in Alaska and the Yukon during the Klondike Gold Rush, as well as the short stories "To Build a Fire", "An Odyssey of the North", and "Love of Life". He also wrote about the South Pacific in stories such as "The Pearls of Parlay", and "The Heathen".',
      image: '',
    });
    await this.authorsRepo.save(author8);

    const author9 = await this.authorsRepo.create({
      name: 'J.K. Rowling',
      description:
        'Joanne Rowling CH OBE FRSL (/ˈroʊlɪŋ/ "rolling";[1] born 31 July 1965), best known by her pen name J. K. Rowling, is a British author and philanthropist. She wrote Harry Potter, a seven-volume children\'s fantasy series published from 1997 to 2007. The series has sold over 600 million copies, been translated into 84 languages, and spawned a global media franchise including films and video games. The Casual Vacancy (2012) was her first novel for adults. She writes Cormoran Strike, an ongoing crime fiction series, under the alias Robert Galbraith.',
      image: '',
    });
    await this.authorsRepo.save(author9);

    const author10 = await this.authorsRepo.create({
      name: 'J. R. R. Tolkien',
      description:
        'John Ronald Reuel Tolkien CBE FRSL (/ˈruːl ˈtɒlkiːn/, ROOL TOL-keen;[a] 3 January 1892 – 2 September 1973) was an English writer and philologist. He was the author of the high fantasy works The Hobbit and The Lord of the Rings.',
      image: '',
    });
    await this.authorsRepo.save(author10);
  }
}
