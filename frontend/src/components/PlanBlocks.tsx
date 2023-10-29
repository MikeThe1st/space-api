
import { useGeneratePaymentLinkMutation } from '../state/api'
import { motion } from 'framer-motion'
import { textVariant, zoomIn } from '../utils/motion'
import { useGetUserQuery, useUpdateUserPlanMutation } from '../state/api'

interface IplanBlock {
    type: string,
    price: number,
    requests: number,
    dashboard: boolean,
    support: boolean,
}


const PlanBlock: React.FC<IplanBlock> = ({ type, price, requests, dashboard, support }, index) => {

    const [generateLink] = useGeneratePaymentLinkMutation()
    const [updatePlan] = useUpdateUserPlanMutation()

    const buySubscription = async (subscriptionType: string) => {
        const link = await generateLink({ subscriptionType })
        if ('data' in link) {
            window.location.href = String(link.data)
        }
    }

    const updateSubscription = async (subscriptionType: string) => {
        const userApproved = window.confirm(`Do you want to update your plan to ${subscriptionType}?`)
        if(userApproved) {
            const update = await updatePlan({ subscriptionType })
            if('data' in update) {
                if('status' in update.data) {
                    if(update.data.status) {
                        window.location.href = '/dashboard'
                    }
                    if('msg' in update.data) {
                        alert(update.data.msg)
                    }
                }
            }
        }
    }

    const { data: userData, isLoading } = useGetUserQuery({})

    if (isLoading) {
        return <div>Loading...</div>
    }
    const { subscription } = userData

    return (
        <div className={type === 'Standard' ? 'py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-11/12 md:max-w-min sm:w-full bg-purple-700 transform scale-1 md:scale-110 lg:scale-150 shadow-xl' : 'py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-10/12 md:max-w-min bg-white transform scale-1 lg:scale-125'}>
            <h1 className={type === 'Standard' ? 'text-purple-200 font-semibold text-xl' : 'text-gray-500 font-semibold text-xl'}>{type}</h1>
            <div className="text-center py-4 px-7">
                <h1 className={type === 'Standard' ? 'text-white text-4xl font-black' : 'text-gray-700 text-4xl font-black'}>${price}.00</h1>
                <p className={type === 'Standard' ? 'text-white text-opacity-50 mt-2' : 'text-gray-500 mt-2'}>Monthly</p>
            </div>
            <div className={type === 'Standard' ? 'h-px bg-purple-400' : 'h-px bg-gray-200'}></div>
            <div className="text-center mt-3 text-lg lg:text-sm">
                <ul className={`${type === 'Standard' ? 'text-white' : 'text-black'}`}>
                    <li className='flex flex-row justify-center' key={index}>
                        Requests: <p className='font-bold mx-1'>{requests}</p>
                    </li>
                    <li className='flex flex-row justify-center'>
                        Dasboard: <p className='font-bold mx-1'>{String(dashboard)}</p>
                    </li>
                    <li className='flex flex-row justify-center'>
                        Support: <p className='font-bold mx-1'>{String(support)}</p>
                    </li>
                </ul>
            </div>
            {
                !subscription ? (
                    <button onClick={() => { buySubscription(type) }} className={type === 'Standard' ? 'w-full mt-6 mb-3 py-2 text-white font-semibold bg-purple-500 hover:shadow-xl duration-200 hover:bg-purple-900' : 'w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-800 hover:shadow-xl duration-200 hover:bg-black'}>Subscribe</button>
                ) : (
                    subscription.type === type ?
                        (
                            <button className={type === 'Standard' ? 'w-full mt-6 mb-3 py-2 text-white font-semibold bg-purple-500 opacity-50 cursor-not-allowed' : 'w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-800 opacity-50 cursor-not-allowed'}>Current</button>
                        ) :
                        (
                            <button onClick={() => { updateSubscription( type ) }} className={type === 'Standard' ? 'w-full mt-6 mb-3 py-2 text-white font-semibold bg-purple-500 hover:shadow-xl duration-200 hover:bg-purple-900' : 'w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-800 hover:shadow-xl duration-200 hover:bg-black'}>Update Plan</button>
                        )
                )
            }
        </div>
    )
}

const PlanBlocks = () => {

    const blocksData: IplanBlock[] = [
        {
            type: "Beginner",
            price: 10,
            requests: 1000,
            dashboard: true,
            support: false,
        },
        {
            type: "Standard",
            price: 30,
            requests: 5000,
            dashboard: true,
            support: true,
        },
        {
            type: "Enterprise",
            price: 100,
            requests: 50000,
            dashboard: true,
            support: true,
        },
    ]

    return (
        <main className="min-h-screen bg-black flex flex-wrap flex-col items-center justify-center pt-20 lg:pt-0 pb-10 md:pb-0">
            <motion.div
                initial="hidden"
                whileInView="show"
                variants={textVariant(0.1)}
                viewport={{ once: true }}>
                <h1 className='text-white text-4xl md:text-5xl xl:text-6xl p-6 text-gradient font-extrabold lg:mb-4 xl:mb-8 2xl:mb-16'>Get your plan now!</h1>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="show"
                variants={zoomIn(0, 0.5)}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-col lg:flex-row xl:flex-row md:flex-row justify-center items-center container gap-6 lg:gap-28 xl:gap-36 md:py-16 lg:py-28 xl:py-30 2xl:mb-16"
            >

                {blocksData.map(({ type, price, requests, dashboard, support }, index) => {
                    return (
                        <PlanBlock type={type} price={price} requests={requests} dashboard={dashboard} support={support} key={index} />
                    )
                })}

            </motion.div>
        </main>
    )
}


export default PlanBlocks