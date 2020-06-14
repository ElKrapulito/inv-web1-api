import { Controller, Get, Param, Post, UseInterceptors, UploadedFile, Res, ClassSerializerInterceptor, Req, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
    constructor(
        private readonly imageService: ImagesService
    ) { }
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll(@Req() req) {
        const host = req.get('host');
        const images = await this.imageService.findAll();
        images.forEach(image => {
            image.url = `http://${host}/images/${image.id}`;
        });
        return images;
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Res() res) {
        const image = await this.imageService.findOne(id);
        res.setHeader('Content-Type', 'image/jpeg');
        return res.send(image.imgFile);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async insertImage(@UploadedFile() file, @Req() req) {
        const host = req.get('host');
        const img = await this.imageService.insertImage(file);
        img.url = `http://${host}/images/${img.id}`;
        return img;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    async deleteImage(@Param('id') id:number) {
        return await this.imageService.deleteImage(id);
    }
    
}
