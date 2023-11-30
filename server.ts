import {createConnection} from "typeorm";
import {User} from "./app/entities/user.entitie";
import { Statement } from "./app/entities/statement.entitie";
import express from "express"
import dotenv from "dotenv"

const PORT = process.env.PORT || 5001
const app = express()
dotenv.config()
const main = async ()=>{
    
    try{
        await createConnection({
            type:"postgres",
            host:"localhost",
            port:5432,
            username:"postgres",
            password:"root",
            database:"typeormDB",
            entities:[User, Statement],
            synchronize: true
        })
        console.log('Connected to PG')
    }catch(err){
        console.log(err)
        throw new Error("unable to connect to PG")
    }
    app.listen(PORT, ()=>{console.log(`server startet on ${PORT}`)})
}

main()