import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async getAll(@Query('search') search: string) {
    return this.authorsService.getAll(search);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.authorsService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads/authors/images/' }))
  async createAuthor(@UploadedFile() file: Express.Multer.File, @Body() body: CreateAuthorDto) {
    return this.authorsService.createAuthor(body, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads/authors/images/' }))
  async(@UploadedFile() file: Express.Multer.File, @Body() body: CreateAuthorDto, @Param('id') id: number) {
    return this.authorsService.updateAuthor(body, file, id);
  }

  @Delete(':id')
  async removeAuthor(@Param('id') id: number) {
    return this.authorsService.removeAuthor(id);
  }
}
