import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
    name:'images'
})
export class ImageApi{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string

    @Column({
        type:'bytea'
    }) 
    @Exclude()
    imgFile:any

    @Column()
    contentType:string

    url:string;
}