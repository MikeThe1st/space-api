import React from 'react'
import BlackHole from './BlackHole.tsx'
import SectionWrapper from '../utils/wrapper/SectionWrapper.tsx'

import { motion } from 'framer-motion'
import { slideIn } from '../utils/motion.ts'

const About: React.FC = () => {
  return (
    <section className='flex flex-row flex-wrap justify-center text-white xl:pt-16 pt-16 items-center xl:gap-24 2xl:gap-0 mt-20'>

      <div className='w-full xl:w-6/12 flex justify-center'>
        <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={slideIn('left', 'linear', 0.2, 0.5)}
                        viewport={{ once: true }}
                    >
        <div className='2xl:w-5/6'>
          <h2 className='header-font text-4xl sm:text-5xl md:text-6xl gradient-text pl-6 pr-6 md:p-2 text-gradient'>What we offer</h2>
          <div className='font-bold text-md sm:text-xl lg:text-2xl xl:text-3xl m-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat lorem a velit dapibus ultrices. Suspendisse venenatis vel mi eget volutpat. Suspendisse faucibus imperdiet leo eget vulputate. Maecenas iaculis mauris vitae ante mollis pellentesque. Vestibulum viverra risus in lectus cursus, sed porttitor tortor maximus. In vel ullamcorper nisl, in sodales diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat lorem a velit dapibus ultrices. Suspendisse venenatis vel mi eget volutpat. Suspendisse faucibus imperdiet leo eget vulputate. </div>
        </div>
          </motion.div>
      </div>

      <div className='w-full xl:w-5/12 xl:h-[52vh] h-[42vh]'>
      <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={slideIn('right', 'linear', 0.2, 0.5)}
                        viewport={{ once: true }}
                        className='w-full h-full'
                    >
        <BlackHole />
        </motion.div>
      </div>
    </section>
  );
}

export default SectionWrapper(About, "about") 