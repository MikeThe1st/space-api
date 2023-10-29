import React from 'react'
import SectionWrapper from '../utils/wrapper/SectionWrapper'

import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery';

interface Isocials {
    icon: React.ElementType,
    title: string,
    link: string
}

const socials: Isocials[] = [
    {
        icon: Instagram,
        title: "Instagram",
        link: "/",
    },
    {
        icon: Facebook,
        title: "Facebook",
        link: "/",
    },
    {
        icon: LinkedIn,
        title: "LinkedIn",
        link: "/",
    },
    {
        icon: Twitter,
        title: "Twitter",
        link: "/",
    },
]

const Footer = () => {
    const isSmall = useMediaQuery('(max-width:650px)');

    return (
        <footer className='relative bg-black h-fit flex flex-row text-center justify-center border-t-4  xl:gap-20 border-b-4'>
            <span className='w-1/2 xl:w-2/6 h-100% text-white border-l-4'>
                <div className='flex flex-col text-white font-semibold items-center gap-2'>
                    <div className='text-center text-2xl xl:text-4xl p-2'>Contact</div>
                    <div className='p-3 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl' key="mail">
                        <div>Email:</div>
                        <div>m.borowa.2003@gmail.com</div>
                    </div>
                    <div className='p-3 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl' key="phone">
                        <div>Phone:</div>
                        <div>+48 123 456 789</div>
                    </div>
                </div>
            </span>
            <span className='w-1/2 xl:w-2/6 h-100% text-white border-l-4 border-r-4'>
                <div className='text-center text-2xl xl:text-4xl p-1 text-white font-semibold'>Socials</div>
                <ul className='h-3/5 flex flex-row flex-wrap text-white font-semibold items-center align-middle justify-center ml-[6vw]'>
                    {socials.map(({ icon: IconComponent, title, link }, index) => (
                        <li key={index} className='w-48 list-none flex flex-row items-center gap-2 md:basis-1/2'>
                            <Link to={link}>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <IconComponent style={{ fontSize: isSmall ? "26px" : "50px" }}/>
                                    </div>
                                    <div className='p-2'>
                                        {title}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </span>
        </footer>
    );
};


export default SectionWrapper(Footer, "contact")