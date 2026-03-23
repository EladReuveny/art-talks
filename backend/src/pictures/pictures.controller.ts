import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { PicturesService } from './pictures.service';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  create(@Body() createPictureDto: CreatePictureDto) {
    return this.picturesService.create(createPictureDto);
  }

  @Get()
  findAll(@Query('q') q?: string) {
    return this.picturesService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picturesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.picturesService.update(id, updatePictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.picturesService.remove(id);
  }
}
