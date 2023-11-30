import {createConnection} from "typeorm";
import {Client} from "./app/entities/client.entitie";

const main = async ()=>{
    try{
        await createConnection({
            type:"postgres",
            host:"localhost",
            port:5432,
            username:"postgres",
            password:"root",
            database:"typeormDB",
            entities:[Client],
            synchronize: true
        })
        console.log('Connected to PG')
    }catch(err){
        console.log(err)
        throw new Error("unable to connect to PG")
    }
}

main()