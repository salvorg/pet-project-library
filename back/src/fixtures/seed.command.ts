import { Command, CommandRunner } from 'nest-commander';
import { FixturesService } from './fixtures.service';

@Command({ name: 'seed', description: 'Load Fixtures' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly fixturesService: FixturesService) {
    super();
  }

  async run(): Promise<void> {
    console.log('===== Dropping tables! =======');
    await this.fixturesService.dropTables();
    console.log('===== Done! =================');
    console.log('===== Creating fixtures! =======');
    await this.fixturesService.createFixtures();
    console.log('===== Done! Ready to work! ======');
  }
}
