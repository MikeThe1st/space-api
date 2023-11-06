import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetUserQuery } from '../state/api'
import { motion } from 'framer-motion'
import { textVariant } from '../utils/motion'
import { useCancelPlanMutation } from '../state/api'

const UserDashboard = () => {

  const [passwordVisible, setPasswordVisible] = useState<Boolean>(false)
  const { data: userData, isLoading, isError } = useGetUserQuery({})
  const [cancelPlan] = useCancelPlanMutation()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !userData) {
    return <div>Error loading user data or no data available.</div>;
  }

  const usage = userData?.subscription?.usage && userData?.subscription?.limit
  ? (Number(userData.subscription.usage) / Number(userData.subscription.limit) * 100).toFixed(2)
  : 'Not available'

  const cancelUserPlan = async () => {
    const result = await cancelPlan({})
    console.log(result)
    if ('data' in result) {
      if ('status' in result.data && 'msg' in result.data) {
        if (result.data.status) alert(result.data.msg)
      }
    }
  }

  return (
    <div className='text-white'>
      {/* ERROR ELEMENT BELOW */}
      {
        'msg' in userData ?
          (
            <main className='h-screen text-center flex flex-col items-center justify-center mx-2'>
              <div className='my-16'>
                <div className='m-6 md:m-10 p-8 text-5xl md:text-6xl lg:text-7xl font-bold text-red-600'>
                  {userData.msg}
                </div>
                <Link to={"/dashboard/plans"} className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold mb-10 lg:mb-20 lg:mt-10 mt-4 bg-[#712592] p-8 rounded-full w-1/3 md:w-1/4 xl:w-1/6 px-8 shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200  hover:bg-[#830cb6]'>
                  Get it now!
                </Link>
                <div className='my-8 text-xl md:text-2xl lg:text-3xl mt-52'>
                  Or if you believe that there is an issue:
                </div>
                <Link to={"/#contact"} className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl mb-10 lg:mb-20 lg:mt-10 mt-2 bg-[#441458] p-4 rounded-full w-1/3 md:w-1/4 xl:w-1/6 shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 hover:bg-[#4e2063]'>
                  Contact us
                </Link>
              </div>
            </main>
          )
          :
          (
            <main className='min-h-screen h-fit text-lg md:text-xl xl:text-2xl'>
              <motion.div
                initial="hidden"
                whileInView="show"
                variants={textVariant(0)}
                viewport={{ once: true }}
                className="justify-center items-center container md:py-8 lg:py-14 xl:py-15 2xl:mb-8 mx-auto"
              >
                <h1 className='text-center pt-28 md:pt-40 font-semibold text-2xl sm:text-3xl md:text-4xl p-2 flex flex-wrap justify-center'>Welcome to dashboard <p className='text-purple-600 mx-2'>{userData?.username}</p>.</h1>
              </motion.div>
              <div className='flex flex-row pt-14 pb-4 mx-4 sm:mx-10 gap-4'>
                <div className='font-bold'>PLAN:</div>
                <div className='text-green-600 font-semibold'>{`${userData?.subscription.type} plan` || ""}</div>
              </div>

              <div className='flex flex-row py-4 sm:py-10 mx-4 sm:mx-10 gap-4'>
                <div className='font-bold'>API KEY:</div>
                <div className='font-semibold'>{passwordVisible ? `${userData?.apiKey}` : '**********************'}</div>
                <button onClick={() => { setPasswordVisible(!passwordVisible) }} className='font-extrabold bg-purple-700 rounded-full w-1/5 sm:w-1/5 md:w-1/8 lg:w-1/12 shadow-xl transition ease-in-out delay-50 hover:bg-[#4e2063] mx-0 md:mx-4 xl:mx-8'>{passwordVisible ? 'HIDE' : 'SHOW'}</button>
              </div>

              <div className='pt-16 mx-4 sm:mx-10 font-bold'>SUBSCRIPTION USAGE THIS MONTH:</div>
              <div className='py-4 sm:py-10 mx-4 sm:mx-10'>
                <div className='w-full md:w-3/4 mx-auto'>
                  <div className='text-center'>{`${usage || 0}%` || "Loading..."}</div>
                  <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-purple-700 h-2.5 rounded-full" style={{ width: `${usage || 0}%` }}></div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col justify-center text-center mt-24'>
                <div className='p-8 text-gradient font-semibold text-3xl md:text-4xl'>
                  Need more features? Upgrade your plan!
                </div>
                <div className='p-2 xl:p-4'>
                  <Link to={"/dashboard/plans"} className='text-xl sm:text-2xl md:text-3xl xl:p-6 font-semibold mb-10 lg:mb-20 lg:mt-10 mt-4 bg-[#9919d1] p-4 rounded-full w-1/3 md:w-1/4 xl:w-1/6 shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200  hover:bg-[#830cb6]'>
                    UPGRADE
                  </Link>
                </div>
              </div>

              <div className='w-11/12 xl:w-4/5 flex flex-col justify-center text-center mt-44 mx-auto'>
                <div className='p-8 text-red-500 font-semibold text-3xl md:text-4xl'>
                  If you want to cancel your plan, click the button below. Since then you won't be charged in the incoming month.
                </div>
                <div className='p-2 xl:p-4'>
                  <button onClick={async () => await cancelUserPlan()} className='text-xl xl:text-2xl xl:p-4 font-semibold mb-10 lg:mb-20 bg-[#a32929d2] p-4 rounded-xl w-1/3 md:w-1/4 xl:w-1/6 shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 hover:bg-[#5c1f1fd2]'>
                    Cancel plan
                  </button>
                </div>
              </div>

            </main>
          )
      }


    </div>
  )
}

export default UserDashboard