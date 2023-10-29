import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, MenuItem, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Navbar: React.FC = () => {
    const links: String[] = ["About", "Contact", "Login", "Sign up"];

    const [isOpen, setIsOpen] = useState<null | HTMLElement>(null)
    const { pathname } = useLocation()

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpen(event.currentTarget);
    }

    const handleClose = () => {
        setIsOpen(null);
    }

    return (
        <nav className="flex w-full z-20 items-center py-5 fixed sm:px-16 px-6 bg-black/40">
            <div className="justify-between flex w-full h-fit flex-row">
                <Link to="/" className="flex items-center gap-2 text-white font-bold">LOGO</Link>
                <ul className="flex-row items-center justify-between list-none gap-10 text-white hidden md:flex">
                    {links.map((link, index) => (
                        <li key={index}>
                            {link === "About" || link === "Contact" ? (
                                <a
                                    href={pathname === '/' ? `#${link.toLowerCase()}` : '/'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (pathname !== '/') {
                                            window.location.href = '/'
                                        }
                                        const section = document.getElementById(link.toLowerCase())
                                        if (section) {
                                            section.scrollIntoView({ behavior: 'smooth' })
                                        }
                                    }}
                                    className='hover:bg-[#9a19d196] rounded-2xl px-4 py-3'
                                >
                                    {link}
                                </a>
                            ) : link === "Login" ? (
                                <Link
                                    to={`/${link.toLowerCase().replace(" ", "")}`}
                                    className="border-2 border-dashed border-[#9919d1] pl-8 pr-8 pt-2 pb-2 rounded-md text-lg hover:bg-[#9a19d196]"
                                >
                                    {link}
                                </Link>
                            ) : link === "Sign up" ? (
                                <Link
                                    to={`/${link.toLowerCase().replace(" ", "")}`}
                                    className="font-bold text-xl bg-gradient-to-r from-indigo-700 to-purple-700 text-white px-9 py-3 rounded-md"
                                >
                                    {link}
                                </Link>
                            ) : (
                                <Link
                                    to={`/${link.toLowerCase().replace(" ", "")}`}
                                    className="hover:bg-[#9a19d196] rounded-2xl px-4 py-3"
                                >
                                    {link}
                                </Link>
                            )}
                        </li>
                    ))}

                </ul>
                <div className='md:hidden flex flex-1 justify-end items-center'>
                    <IconButton
                        aria-label="menu"
                        aria-controls="menu"
                        aria-haspopup="true"
                        onClick={handleMenuClick}
                        sx={{ color: '#9919d1', backgroundColor: 'black' }}
                        className='nav-shadow opacity-80'
                    >
                        {
                            isOpen ? <CloseIcon /> : <MenuIcon />
                        }
                    </IconButton>
                    <Menu
                        id="menu"
                        anchorEl={isOpen}
                        keepMounted
                        open={Boolean(isOpen)}
                        onClose={handleClose}
                        PaperProps={{ style: { width: '100%', height: '50vh', backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "center", opacity: "0.85" } }}
                    >
                        {links.map((link, index) => (
                            <MenuItem key={index} onClick={handleClose} sx={{ width: "100vw", justifyContent: "center" }}>
                                {link === "About" || link === "Contact" ? (
                                    <Link
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const aboutSection = document.getElementById('about');
                                            if (aboutSection) {
                                                aboutSection.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                        className="text-white text-bold w-3/4 h-[8vh] flex justify-center items-center text-xl border-2 rounded-md"
                                    >
                                        {link}
                                    </Link>
                                ) : (
                                    <Link to={`${link.toLowerCase().replace(" ", "")}`}>{link}</Link>
                                )}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;
