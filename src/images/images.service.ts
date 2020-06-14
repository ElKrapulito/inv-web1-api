import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageApi } from './image-api.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImageApi)
        private imageRepository:Repository<ImageApi>
    ){}

    async findAll(){
        return await this.imageRepository.find();
    }

    async findOne(id:number){
        const image = await this.imageRepository.findOne(id);
        if(!image){
            throw new NotFoundException(`Image not found with id ${id}`);
        }
        return image;
    }

    async insertImage(file){
        const image = new ImageApi();
        if(!file){
            throw new NotFoundException('File not found!')
        }
        image.name = file.originalname;
        image.imgFile = file.buffer;
        image.contentType = file.mimetype;

        return await this.imageRepository.save(image);
    }

    async deleteImage(id:number){
        const image = await this.imageRepository.findOne(id);
        if(!image){
            throw new NotFoundException(`Image to delete not found with id: ${id}`)
        }
        return this.imageRepository.delete(id);
    }
}
