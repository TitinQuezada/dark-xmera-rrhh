import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import Storage from './utils/storage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async get() {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async post(@UploadedFile() file: Express.Multer.File) {
    await Storage.uploadFile(file, 'prueba2/nombre');
    // await Storage.downloadFile();
    return this.appService.getHello();
  }
}
