import {IreqBody} from "./statement.interface";
import { Request, Response, Router } from "express"
import {Statement} from "../entities/statement.entitie";


const router = Router()

router
    .post("/", async (req:Request<IreqBody>, res:Response)=>{
    const {description, auto_number} = req.body
    const statement = new Statement()
    statement.auto_number = auto_number
    statement.description = description
    await statement.save()
    res.json(statement)
})
    .get("/", async(req:Request, res:Response)=>{
    const statement = await Statement.find()
    res.json(statement)
})
    .delete('/:id', async(req:Request, res:Response)=>{
    const statement = Statement.delete({
        id:+req.params.id
    })
    res.json({message:"deleted"})
})
    .put('/:id',async(req:Request, res:Response)=>{
    const {status} = req.body
    const statement = await Statement.findOneByOrFail({
        id: +req.params.id
    })
    if(statement){
        statement.status = status
        await statement.save()
        res.json({message:"complied"})
        return
    }else{
        res.json({message:"error"})
    }
})
    .get('/:id', async(req:Request, res:Response)=>{
    const statement = await Statement.findOneBy({
        id: +req.params.id
    })
    res.json(statement)
})
export default router