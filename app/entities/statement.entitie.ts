import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./utils/base.entitie";
import { User } from "./user.entitie"; 

@Entity('statement')
export class Statement extends Base {
    @Column()
    description: string;

    @Column()
    auto_number: string;

    @Column()
    status: string;

    @ManyToOne(() => User, (user) => user.statement)
    user: User
}