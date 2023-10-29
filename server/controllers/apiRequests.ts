import { NextFunction, Request, Response } from 'express'
import User from '../models/User'
import ImongooseUser from '../interfaces/interfaces'
import axios from 'axios'
   
export const asteroidsNearEarth = async (req: Request, res: Response) => {
    try {
        const {api_key} = req.query

        const apiUser = await User.findOne<ImongooseUser>({apiKey: api_key})
        if(apiUser) {
            const currentDate = new Date()
            const currentYear = currentDate.getFullYear()
            const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
            const currentDay = currentDate.getDate().toString().padStart(2, '0')
            const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`

            const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate}&current_date=${formattedDate}&api_key=${process.env.MYAPI_SECRET}`)
            apiUser.subscription.usage++
            await apiUser.save()
            const responseData = response.data

            // Data configuration
            const {links, ...rest1} = responseData
            const withoutLinksData = rest1
            const objectsData = withoutLinksData.near_earth_objects[formattedDate]
            const modifiedData = objectsData.map(item => {
                const {links, ...rest2} = item
                return {...rest2}
            })
            return res.status(201).json(modifiedData)
        }
        else {
            return res.status(404).json('user not found')
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json('Something went wrong.')
    }
}

export const marsPhotos = async (req: Request, res: Response) => {
    try {
        const {api_key, photos} = req.query
        let numberOfPhotos: number

        if(!photos) numberOfPhotos = 1
        else {
            if(Number(photos) < 1) numberOfPhotos = 1
            else if(Number(photos) > 100) numberOfPhotos = 100
            else numberOfPhotos = Number(photos)
        }

        const apiUser = await User.findOne<ImongooseUser>({apiKey: api_key})
        if(apiUser) {
            
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.MYAPI_SECRET}`)
            const photos = response.data.photos.slice(0, numberOfPhotos)
            apiUser.subscription.usage++
            await apiUser.save()
            return res.status(201).json(photos)
        }
        else {
            return res.status(404).json('user not found')
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json('Something went wrong.')
    }
}

export const pictureOfTheDay = async (req: Request, res: Response) => {
    try {
        const {api_key} = req.query

        const apiUser = await User.findOne<ImongooseUser>({apiKey: api_key})
        if(apiUser) {
            apiUser.subscription.usage++
            await apiUser.save()
            const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.MYAPI_SECRET}`)
            const responseData = response.data
            return res.status(201).json(responseData)
        }
        else {
            return res.status(404).json('user not found')
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json('Something went wrong.')
    }
}

export const apiMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {api_key} = req.query
        if(!api_key) return res.status(409).json('Provide api key.')
        
        const apiUser = await User.findOne<ImongooseUser>({apiKey: api_key})
        if(!apiUser) return res.status(404).json(`Could not find user with ${api_key}. Make sure your API key is correct.`)

        // If user plan enables to make another API request
        if(apiUser.subscription.usage < apiUser.subscription.limit) {
            next()
        }
        else {
            return res.status(409).json('Seems you used all your API requests. In order to keep sending them, get better plan.')
        }
        
    } catch (error) {
        console.log(error)
        return res.status(409).json('Access forbidden.')
    }
}