import { Iname, IreqBody } from "./auth.interface"
import { Request, Response, Router } from "express"
import {User} from "../entities/user.entitie"
import crypto from "crypto"
import getRepository from "typeorm"

const router = Router()
const hashPass:(password:string) => string = password =>{
    const hash=crypto.createHash("sha256")
    const hashedPass = hash.update(password).digest('hex')
    return hashedPass
}

router.post("/register", async (req: Request<IreqBody>, res:Response)=>{
    const {email, login, password, numberPhone, fullName } = req.body
    const [lastName, firstName, middleName]:Iname = fullName.split(' ')
    const user = new User()
    user.email = email
    user.password = hashPass(password)
    user.login = login
    user.number_phone = numberPhone
    user.last_name = lastName
    user.first_name = firstName
    user.middle_name = middleName

    res.json(hashPass(password))
})

export default router