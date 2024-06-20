import { Request } from "express"

export interface AuthRequest extends Request {
    user: {id: string, exp: number, iat: number}
}