import React from 'react'
import { ElectricBolt, Public, Storage } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { textVariant, zoomIn } from '../utils/motion';

const advantagesData = [
    {
        icon: ElectricBolt,
        title: "Fast & Secure",
        description: "We pay attention to our secure systems as well as keep improving our speed."
    },
    {
        icon: Public,
        title: "Worldwide",
        description: "We serve millions of people around the world."
    },
    {
        icon: Storage,
        title: "API Access",
        description: "We provide API for developers. In case they would like to use our service in their apps."
    },
];

interface AdvantageAdvantageData {
    icon: React.ElementType,
    title: String,
    description: String,
}

const AdvantageCart: React.FC<AdvantageAdvantageData> = ({ icon: IconComponent, title, description }) => {
    return (
        <div className='flex flex-col justify-start items-center w-full sm:w-80 h-auto bg-blue text-white sm:gap-10 gap-6 p-4 mt-10 md:my-16 md:mx-8 '>
            <div className='mb-4'>
                <IconComponent style={{ color: "#9919d1", fontSize: "4rem" }} />
            </div>
            <div className='sm:text-3xl text-2xl font-semibold text-gradient mb-2'>
                {title}
            </div>
            <div className='sm:text-2xl text-xl w-70 h-auto flex items-center'>
                <div className='justify-center'>
                    {description}
                </div>
            </div>
        </div>
    );
};

const Advantages = () => {
    return (

        <section className='flex flex-col justify-center items-center text-center m-10 sm:my-28 scale-110'>
            <div className='text-bold text-white font-extrabold text-5xl md:text-6xl m-3 relative'>
                <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={textVariant(0.25)}
                        viewport={{ once: true }}
                    >
                <div className='text-backlight'></div>
                    Why us?
                </motion.div>
            </div>
            <div className='flex flex-wrap flex-row w-11/12 justify-center gap-6 sm:gap-8 max-w-screen-xl mx-auto pt-5 pb-10 '>
                {advantagesData.map((advantage, index) => (
                    <motion.div
                        initial="hidden"
                        variants={zoomIn(0.2, 0.25)}
                        viewport={{ once: true }}
                        whileInView="show"
                        key={`advantage-${index}`}
                    >
                        <AdvantageCart
                            icon={advantage.icon}
                            title={advantage.title}
                            description={advantage.description}
                        />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}



export default Advantages;
