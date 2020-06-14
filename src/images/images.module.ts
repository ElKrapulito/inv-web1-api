import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageApi } from './image-api.entity';




@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports:[
    TypeOrmModule.forFeature([ImageApi])
  ],
  exports:[TypeOrmModule]
})
export class ImagesModule {}
