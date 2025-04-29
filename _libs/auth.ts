import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string

export async function hashPassword(password : string) {
    return bcrypt.hash(password, 10)
}

export async function comparePassword(password : string, hashedPassword : string) {
    return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload : object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn : "7d" })
}

export function verifyToken(token : string) {
    return jwt.verify(token, JWT_SECRET)
}