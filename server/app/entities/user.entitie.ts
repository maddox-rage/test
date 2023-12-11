import {Entity, Column, OneToMany}  from "typeorm"
import { Base } from "./utils/base.entitie"
import {Statement} from "./statement.entitie";

@Entity("user")
export class User extends Base{
    @Column()
    first_name:string

    @Column()
    last_name:string

    @Column()
    middle_name:string

    @Column()
    is_admin:boolean

    @Column({
        unique:true
    })
    email:string

    @Column()
    password:string

    @Column()
    number_phone:string

    @Column({
        unique:true
    })
    login:string

    @OneToMany(() => Statement, (statement) => statement.user)
    statement: Statement[]
}
