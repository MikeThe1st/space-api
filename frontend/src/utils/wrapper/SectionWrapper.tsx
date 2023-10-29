import { motion } from 'framer-motion'
import { ComponentType } from 'react';
//import { staggerContainer } from '../utils/motion'

const SectionWrapper = (Component: ComponentType, idName: string) =>
    function HOC() {
        return (
            <motion.section
                initial="hidden"
                whileInView="visible"
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // transition={{ ease: "easeOut", duration: 2 }}
                // variants={{
                //     visible: { opacity: 1 },
                //     hidden: { opacity: 0}
                //   }}
                // as user see it first time
                // viewport={{ once: true, amount: 0.25 }}
                viewport={{ once: true}}
                className={'mx-auto relative z-0'}
            >
                <span className='hash-span' id={idName}>
                    &nbsp;
                </span>
                <Component />
            </motion.section>
        )
    }

export default SectionWrapper