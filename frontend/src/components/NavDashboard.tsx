import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuItem, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { LogoutOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useVerifyJwtMutation } from '../state/api'

interface Ilinks {
    name: string;
    path: string;
}

const links: Ilinks[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Plans", path: "/dashboard/plans" },
    { name: "Docs", path: "/dashboard/api-docs" }
];


const NavDashboard: React.FC = () => {
    const [isOpen, setIsOpen] = useState<null | HTMLElement>(null)
    const [username, setUsername] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const [verifyJwt] = useVerifyJwtMutation({})

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
              const response = await verifyJwt({});
              if('data' in response) {
                setUsername(response.data.username)
              }
            } catch (error) {
              console.error('Error verifying JWT:', error);
            } finally {
              setIsLoading(false);
            }
        }

        checkAuthentication()
    }, [verifyJwt])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpen(event.currentTarget);
    }

    const handleClose = () => {
        setIsOpen(null);
    }

    const logout = () => {
        document.cookie = "token" + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        console.log("logout")
        navigate('/login')
        location.reload()
    }

    return (
        <nav className="flex w-full z-20 items-center py-5 fixed sm:px-16 px-6 bg-black/40">
            <div className="justify-between flex w-full h-fit flex-row">
                <Link to="/" className="flex items-center gap-2 text-white font-bold">LOGO</Link>
                <ul className="flex-row items-center justify-between list-none gap-10 text-white hidden md:flex">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.path}
                                className='hover:bg-[#9a19d196] rounded-2xl px-4 py-3'
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                    <li className='flex flex-row items-center'>
                        <div className='rounded-full bg-purple-800 px-3 py-3 mx-1 w-10 h-10 flex items-center justify-center text-white'>
                            {username?.charAt(0).toLocaleUpperCase() || "U"}
                        </div>
                        <div className='mx-2'>
                            {username?.toUpperCase() || "USERNAME"}
                        </div>
                        <div onClick={logout} className='hover:cursor-pointer hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center'>
                            <LogoutOutlined />
                        </div>
                    </li>

                </ul>
                <div className='md:hidden flex flex-1 justify-end items-center z-20'>
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
                                <Link
                                    to={link.path}
                                    className="text-white text-bold w-3/4 h-[8vh] flex justify-center items-center text-xl border-2 rounded-md"
                                >
                                    {link.name}
                                </Link>
                            </MenuItem>
                        ))}
                        <MenuItem onClick={logout} sx={{ width: "100vw", justifyContent: "center" }}>
                                <div className="text-white text-bold w-3/4 h-[8vh] flex justify-center items-center text-xl border-2 rounded-md">
                                    Logout
                                </div>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}

export default NavDashboard;
