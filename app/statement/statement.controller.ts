import {IreqBody} from "./statement.interface";
import { Request, Response, Router } from "express"
import {Statement} from "../entities/statement.entitie";

const router = Router()

router
    // @desc    get statement by id
    // @route   POST /api/statement/:id
    // @access  private
    .get('/:id', async(req:Request, res:Response)=>{
        const statement = await Statement.findOneBy({
            id: +req.params.id
        })
        res.json(statement)
    })
    // @desc    get all statements
    // @route   GET /api/statement/
    // @access  private
    .get("/", async(req:Request, res:Response)=>{

        const statement = await Statement.find()
        res.json(statement)
    })
    // @desc    create statement
    // @route   POST /api/statement/
    // @access  private
    .post("/", async (req:Request<IreqBody>, res:Response)=>{
        const {description, auto_number} = req.body
        const statement = new Statement()
        statement.auto_number = auto_number
        statement.description = description
        await statement.save()
        res.json(statement)
})
    // @desc    update statement
    // @route   PUT /api/statement/:id
    // @access  private
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
    // @desc    delete statement
    // @route   DELETE /api/statement/:id
    // @access  private
    .delete('/:id', async(req:Request, res:Response)=>{
    const statement = Statement.delete({
        id:+req.params.id
    })
    res.json({message:"deleted"})
})
export default router