import {  BaseEntity, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Base extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at:Date
}