import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

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
    imgFile:any

    @Column()
    contentType:string
}