import { Controller, Get, Param, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
    constructor(
        private readonly imageService: ImagesService
    ) { }

    @Get()
    async findAll() {
        return await this.imageService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Res() res) {
        const image = await this.imageService.findOne(id);
        //res.setHeader('Content-Type', image.contentType);
        // res.send(image.img_file.data);
        res.setHeader('Content-Type', 'image/jpeg');
        return res.send(image.imgFile);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async insertImage(@UploadedFile() file) {
        return await this.imageService.insertImage(file);
    }
}
