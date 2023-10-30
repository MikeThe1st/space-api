import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User'

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        // Check if the username or email already exist in the database
        const existingUser = await User.findOne({ $or: [{ username }, { email }] })

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(409).json({ msg: `User with username: ${username} already exists. Please choose a different username.` })
            }
            if (existingUser.email === email) {
                return res.status(409).json({ msg: `User with email: ${email} already exists. Please choose a different email.` })
            }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ username, email, password: hashedPassword })
        const savedUser = await newUser.save()

        // Possibly do not return savedUser insead return msg "User saved" to the frontend
        return res.status(201).json('Signup successful.')
    } catch (error) {
        console.error('Registration failed:', error);
        return res.status(500).json({ error: 'Registration failed.' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body

        const loginUser = await User.findOne({ username: username })
        if(!loginUser) {
            return res.status(404).json({msg: 'User not found.'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, loginUser.password)

        if (isPasswordCorrect) {
            console.log('Password matches. Login successful.')
            const {subscription, apiKey} = loginUser
            const payload = { username, subscription, apiKey }
            const secretKey = process.env.JWT_SECRET
            const expiresIn = '1d'
            const token = await jwt.sign(payload, secretKey, {expiresIn})
            res.cookie("token", token, { httpOnly: false, secure: true, domain: 'space-api-app.onrender.com', path: '/', sameSite: 'none' })
            return res.status(200).json({ token, msg: 'Login success.' })
        }
        else {
            console.log('Password does not match. Login failed.')
            return res.status(409).json({ msg: 'Please provide valid username and password.' })
        }
    } catch (error) {
        console.error('Login failed:', error);
        return res.status(500).json({ error: 'Login failed.' });
    }
}
export const userVerification = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(404).json({ error: 'Token not found.', status: false });
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res.status(500).json({ error: 'JWT secret key is not configured.', status: false });
        }

        const decoded = await jwt.verify(token, secretKey)
        if (!decoded.username) {
            return res.status(401).json({ error: 'Invalid token.', status: false })
        }

        const checkUser = await User.find({username: decoded.username})
        if(!checkUser) {
            return res.status(404).json({msg: "User not found.", status: false})
        }
        return res.status(200).json({ username: decoded.username, status: true  })
    } catch (error) {
        return res.status(500).json({ error: 'Authentication failed.', status: false })
    }
}