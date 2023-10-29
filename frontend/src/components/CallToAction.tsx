import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { textVariant, zoomIn } from '../utils/motion'

const CallToAction = () => {
  return (
    <section className='flex flex-col bg-gradient-to-r from-indigo-700 to-purple-700 text-white items-center sm:mt-20 sm:mb-20 mt-14 mb-14 text-center'>
      <motion.div
        className='text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold pt-20 pb-10 mx-2'
        initial="hidden"
        whileInView="show"
        variants={textVariant(0.25)}
        viewport={{ once: true }}
      >
        Move your apps to next level with Space API.
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={zoomIn(0.25, 0)}
        viewport={{ once: true }}
        className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-10 lg:mb-20 lg:mt-10 mt-4 bg-[#9919d1] p-6 rounded-full w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6 pr-4 pl-4 shadow-xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 hover:bg-[#830cb6]'
      >
        <Link to={"/signup"} >
          Start now
        </Link>
      </motion.div>
    </section>
  )
}

export default CallToAction