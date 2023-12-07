import {IreqBody} from "./statement.interface";
import { Request, Response, Router } from "express"
import {Statement} from "../entities/statement.entitie";
import {decodeToken} from "../middleware/token.middleware";

const router = Router()
router// @desc    get users statements
    // @route   GET /api/statement/user
    // @access  private
    .get("/user", async(req:Request, res:Response)=>{
        let token = req.headers.authorization
        let userData
        if(token){
            token = token.replace("Bearer ", "")
            userData = decodeToken(token)
        }
        if(userData){
            const statement = await Statement.findBy({
                user: {
                    id: userData.userData.id
                }
            })
            res.json(statement)
            return
        }
        res.json({message:"token failed"})
    })
router
    // @desc    get statement by id
    // @route   POST /api/statement/:id
    // @access  private
    .get('/:id', async(req:Request, res:Response)=>{
        let token = req.headers.authorization
        let userData
        if(token){
            token = token.replace("Bearer ", "")
            userData = decodeToken(token)
        }
        const isAdmin = userData?.admin
        if(userData){
            if(isAdmin){
                const statement = await Statement.findOneBy({
                    id: +req.params.id
                })
                if(statement){
                    res.json(statement)
                    return
                }
                res.status(400).json({message:"Bad request"})
                return
            }else{
                res.status(403).json({message:"Forbidden"})
            }
        }
        res.json({message:"token failed"})
    })
    // @desc    get all statements
    // @route   GET /api/statement/
    // @access  private
    .get("/", async(req:Request, res:Response)=>{
        let token = req.headers.authorization
        let userData
        if(token){
            token = token.replace("Bearer ", "")
            userData = decodeToken(token)
        }
        const isAdmin = userData?.admin
        if(userData){
            if(isAdmin){
                const statement = await Statement.find()
                res.json(statement)
                return
            }
            res.status(403).json({message:"Forbidden"})
            return
        }
        res.json({message:"token failed"})
    })
    // @desc    create statement
    // @route   POST /api/statement/
    // @access  private
    .post("/", async (req:Request<IreqBody>, res:Response)=>{
        const {description, auto_number} = req.body
        let token = req.headers["authorization"]
        let userData
        if(token){
            token = token.replace("Bearer ", "")
            userData = decodeToken(token)
        }
        if(userData){
            const statement = new Statement()
            statement.auto_number = auto_number
            statement.description = description
            statement.status = "new"
            statement.user = userData?.userData.id
            await statement.save()
            res.json(statement)
        }else {
            res.json({message:"token failed"})
        }
})
    // @desc    update statement
    // @route   PUT /api/statement/:id
    // @access  private
    .put('/:id',async(req:Request, res:Response)=>{
        let token = req.headers["authorization"]
        let userData
        if(token){
            token = token.replace("Bearer ", "")
            userData = decodeToken(token)
        }
        const isAdmin = userData?.admin
        if(userData){
           if(isAdmin){
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
                   return
               }
           }else{
               res.status(403).json({message: "Forbidden"})
               return
           }
        }
        res.json({message:"token failed"})
    })
    // @desc    delete statement
    // @route   DELETE /api/statement/:id
    // @access  private
    .delete('/:id', async(req:Request, res:Response)=>{
        let token = req.headers["authorization"]
        let userData
        if(token){
            token = token.replace("Bearer ", "")
            userData = decodeToken(token)
        }
        const isAdmin = userData?.admin
        if(userData){
            if(isAdmin){
                const statement = Statement.delete({
                    id:+req.params.id
                })
                res.json({message:"deleted"})
                return
            }
            res.status(403).json({message:"Forbidden"})
            return
        }
        res.json({message:"token failed"})
})
export default router