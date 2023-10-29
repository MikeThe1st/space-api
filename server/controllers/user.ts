import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Stripe from 'stripe'
import { Document, Schema } from 'mongoose'
import crypto from 'crypto'

import User from '../models/User'

interface IUser extends Document {
    userId: Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    subscription: {
        type: string;
        limit: number;
        usage: number;
    };
    apiKey: string;
    stripeCustomerId: string;
}

interface IUserSubUpdate {
    type: string,
    limit: number,
    usage: number,

}

interface IplanBlock {
    stripeId: string,
    type: string,
    requests: number,
}


const subsData: IplanBlock[] = [
    {
        stripeId: 'price_1O4WtZEmW7hYJxA9TY6JEHXv',
        type: "Beginner",
        requests: 1000,
    },
    {
        stripeId: 'price_1O4Wu1EmW7hYJxA962aZwQND',
        type: "Standard",
        requests: 5000,
    },
    {
        stripeId: 'price_1O4WuWEmW7hYJxA9PAaY7Olu',
        type: "Enterprise",
        requests: 50000,
    },
]

export const saveSub = async (entirePlan: any, username: string) => {
    try {
        if (entirePlan.active) {
            const currentSub = subsData.find(sub => sub.stripeId === entirePlan.id)
            const user = await User.findOne<IUser>({ username: username })

            let usage: number
            if (!user.subscription) usage = 0
            else usage = user.subscription.usage

            let userSubUpdate: IUserSubUpdate =
            {
                type: currentSub.type,
                limit: currentSub.requests,
                usage: usage
            }
            user.subscription = userSubUpdate
            await user.save()
        }
    } catch (error) {
        console.log(error)
    }

}

export const dashboardUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token
        const secretKey = process.env.JWT_SECRET
        const stripe = new Stripe(process.env.STRIPE_SECRET, {
            apiVersion: '2023-10-16',
        })

        const decoded = await jwt.verify(token, secretKey)
        const checkUser = await User.findOne<IUser>({ username: decoded.username })

        if (checkUser) {
            if (checkUser.stripeCustomerId) {
                if (!checkUser.subscription.type) {
                    const userSub = await stripe.subscriptions.list({ customer: String(checkUser.stripeCustomerId) })
                    if ('plan' in userSub.data[0]) {
                        const { plan } = userSub.data[0]
                        const { username } = checkUser
                        await saveSub(plan, username)
                    }
                    if (!checkUser.apiKey) {
                        const updatedUser = await User.findOneAndUpdate<IUser>(
                            { username: checkUser.username },
                            { $set: { 'apiKey': crypto.randomUUID() } }
                        )
                    }
                }

                const refetchedUser = await User.findOne<IUser>({ username: checkUser.username })
                const { apiKey, username, subscription } = refetchedUser

                const frontendUser = { username, apiKey, subscription }
                return res.status(201).json(frontendUser)
            }
            // NO PLAN
            else {
                const { username } = checkUser
                return res.status(200).json({ username, msg: 'Get plan to access the dashboard.' })
            }
        }
        else return res.status(404).json('User not found.')
    } catch (error) {
        return res.status(500).json(`An error occured: ${error}`)
    }
}