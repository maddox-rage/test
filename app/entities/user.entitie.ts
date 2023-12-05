import {Entity, Column}  from "typeorm"
import { Base } from "./utils/base.entitie"

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

    // @Column({
    //     type:"simple-array",
    //     default:[]
    // })
    // statement:string[]
}
