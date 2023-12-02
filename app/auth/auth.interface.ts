export interface IreqBody {
    login:string
    password: string
    email: string
    numberPhone: string
    fullName: string
}

export interface Iname extends Iterable<string> {
    lastName: string
    firstName: string
    middleName: string
}