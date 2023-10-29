import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import Stripe from 'stripe'

import { saveSub } from './user'

const subsData = [
    { type: 'Beginner', value: 'price_1O4WtZEmW7hYJxA9TY6JEHXv' },
    { type: 'Standard', value: 'price_1O4Wu1EmW7hYJxA962aZwQND' },
    { type: 'Enterprise', value: 'price_1O4WuWEmW7hYJxA9PAaY7Olu' },
]

export const createCustomerIfNull = async (req: Request, res: Response) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET, {
            apiVersion: '2023-10-16',
        })
        const token = req.cookies.token
        const secretKey = process.env.JWT_SECRET
        const { subscriptionType } = req.body
    
        const decoded = jwt.verify(token, secretKey)
        const { username } = decoded
        const loginUser = await User.findOne({ username: username })
        if (!loginUser) {
            return res.status(404).json({ msg: "User not found." })
        }
    
        // If user didn't buy sub yet, create Stripe customerId
        if (!loginUser.stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: String(loginUser.email)
            })
    
            await User.findOneAndUpdate({ username: username }, { stripeCustomerId: customer.id })
        }
    
        const updatedUser = await User.findOne({ username: username })
        const link = await createCheckoutLink(updatedUser.stripeCustomerId, subscriptionType)
        res.status(201).json(link)
    } catch (error) {
        console.log(error)
        return res.status(500).json(`An error occured: ${error}`)
    }
    
}

export const createCheckoutLink = async (customerId: string, providedType: string) => {
    try {
        const selectedSub = subsData.find(sub => sub.type === providedType)

        const stripe = new Stripe(process.env.STRIPE_SECRET, {
            apiVersion: '2023-10-16',
        })
        const checkout = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [
                {
                    price: selectedSub.value,
                    quantity: 1,
                }
            ],
            mode: "subscription",
            success_url: "http://localhost:5173/dashboard",
            cancel_url: "http://localhost:5173/dashboard/plans",
        })
        return checkout?.url
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updatePlan = async (req: Request, res: Response) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET, {
            apiVersion: '2023-10-16',
        })
        const token = req.cookies.token
        const secretKey = process.env.JWT_SECRET
        const { subscriptionType } = req.body

        const decoded = jwt.verify(token, secretKey)
        const { username } = decoded

        const loginUser = await User.findOne({ username: username })
        if (!loginUser) {
            return res.status(404).json({ msg: "User not found.", status: false })
        }

        const userSub = await stripe.subscriptions.list({ customer: String(loginUser.stripeCustomerId) })
        const subscriptionId = userSub.data[0].id
        const itemId = userSub.data[0].items.data[0].id

        const selectedSub = subsData.find(sub => sub.type === subscriptionType)

        // Update sub
        await stripe.subscriptions.update(subscriptionId, {
            items: [
                {
                    id: itemId,
                    price: selectedSub.value,
                },
            ],
        })

        const updatedSubscription = await stripe.subscriptions.list({ customer: String(loginUser.stripeCustomerId) })

        // Saving updated plan
        if ('plan' in updatedSubscription.data[0]) {
            const { plan } = updatedSubscription.data[0] as { plan: { active: boolean } }
            await saveSub(plan, loginUser.username)
            return res.status(201).json({ msg: `Subscription updated to ${selectedSub.type}`, status: true })

        }
        else {
            console.log('Plan not found or not active.')
            return res.status(400).json({ msg: 'Subscription is not active.', status: false })
        }
    } catch (error) {
        return res.status(500).json(`An error occured: ${error}`)
    }
}

export const cancelPlan = async (req: Request, res: Response) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET, {
            apiVersion: '2023-10-16',
        })
        const token = req.cookies.token
        const secretKey = process.env.JWT_SECRET

        const decoded = jwt.verify(token, secretKey)
        const { username } = decoded

        const loginUser = await User.findOne({ username: username })
        if (!loginUser) {
            return res.status(404).json({ msg: "User not found.", status: false })
        }

        const userSub = await stripe.subscriptions.list({ customer: String(loginUser.stripeCustomerId) })
        const subscriptionId = userSub.data[0].id
        // const itemId = userSub.data[0].items.data[0].id

        // Cancelling pan, by deactivating it
        await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
        })
        return res.status(201).json({msg: 'Plan cancelled.', status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json(`An error occured: ${error}`)
    }
}