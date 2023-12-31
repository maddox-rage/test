import { Iname, IreqBody } from "./auth.interface"
import { Request, Response, Router } from "express"
import {User} from "../entities/user.entitie"
import crypto from "crypto"
import {decodeToken, generateToken} from "../middleware/token.middleware"

const router = Router()
const hashPass:(password:string) => string = password =>{
    const hash=crypto.createHash("sha256")
    const hashedPass = hash.update(password).digest('hex')
    return hashedPass
}

router
    // @desc    register user
    // @route   POST /api/auth/register
    // @access  public
    .post("/register", async (req: Request<IreqBody>, res:Response)=>{
  try{
      const {email, login, password, numberPhone, fullName } = req.body
      const [lastName, firstName, middleName]:Iname = fullName.split(' ')
      const user = new User()
      user.email = email
      user.password = hashPass(password)
      user.login = login
      user.number_phone = numberPhone
      user.first_name =firstName
      user.middle_name =middleName
      user.last_name =lastName
      user.is_admin = false
      await user.save()
      const token:string = generateToken(user)
      res.json({user, token})
  }catch (err){
      res.json(err)
  }
})
    // @desc    login user
    // @route   POST /api/auth/login
    // @access  public
    .post("/login", async (req: Request<IreqBody>, res:Response)=>{
try{
    const {login, password } = req.body
    const user = await User.findOneBy({
        login: login
    })
    if(!user){
        res.json({message: "error"})
        return
    }
    const isValidPass = user.password === hashPass(password)
    if(!isValidPass){
        res.json({message: "invalid password or login"})
        return
    }
    const token:string = generateToken(user)
    res.json({user, token})
}catch (err){
    res.json(err)
}
})

export default router