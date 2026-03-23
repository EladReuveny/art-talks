import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './entities/picture.entity';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private readonly picturesRepository: Repository<Picture>,
  ) {}

  async create(createPictureDto: CreatePictureDto) {
    const picture = this.picturesRepository.create(createPictureDto);
    return await this.picturesRepository.save(picture);
  }

  async findAll(q?: string) {
    return await this.picturesRepository.find({
      where: q
        ? [{ title: ILike(`%${q}%`) }, { artistName: ILike(`%${q}%`) }]
        : {},
    });
  }

  async findOne(id: string) {
    return await this.picturesRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updatePictureDto: UpdatePictureDto) {
    return `This action updates a #${id} picture`;
  }

  async remove(id: string) {
    await this.picturesRepository.delete({ id });
  }
}
