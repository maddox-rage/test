import {createConnection} from "typeorm";
import {User} from "./app/entities/user.entitie";
import { Statement } from "./app/entities/statement.entitie";
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./app/auth/auth.controller"
import stateRoutes from "./app/statement/statement.controller"

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5001
const main = async ()=>{
    app.use(express.json())
    app.use('/api/auth', authRoutes)
    app.use('/api/statement', stateRoutes)
    try{
        await createConnection({
            type:"postgres",
            host:"localhost",
            port:5432,
            username:"postgres",
            password:"postgre",
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