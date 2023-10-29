import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSignupMutation, useLoginMutation } from '../state/api';
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'


const AuthForm: React.FC = () => {
    let navigate = useNavigate()
    let {pathname} = useLocation()
    pathname = pathname.slice(1)


    const initialFormData = pathname === 'signup'
        ? {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
        : {
            username: '',
            password: '',
        };

    const [formData, setFormData] = useState(initialFormData)
    const [failMsg, setFailMsg] = useState("")

    const [signup, { isLoading: signupIsLoading}] = useSignupMutation()
    const [login, { isLoading: loginIsLoading}] = useLoginMutation()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmitForm = async (e: FormEvent) => {
        e.preventDefault()
        try {
            if(pathname === 'signup') {
                if (formData.password !== formData.confirmPassword) {
                    alert('Your passwords are not the same.')
                    return;
                }
            }
            const result = (pathname === 'signup') ? await signup(formData) : await login(formData)
            
            if ('error' in result) {
                const { error: { data } } = result as { error: { status: number; data: { msg: string } } }
                setFailMsg(data.msg.toString())
                console.log(result)
            }
            else{
                if(pathname === 'signup') return navigate('/login')
                else navigate('/dashboard')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }


    return (
        <main className='min-h-screen flex flex-wrap flex-col items-center justify-center mx-auto'>
            {failMsg !== "" ? (
            <div className='w-4/5 md:w-3/5 xl:w-2/5 absolute top-[10vh] sm:top-[8vh] text-center font-semibold sm:px-4 sm:py-2 md:px-8 md:py-4'>
                <Alert variant="filled" severity="error">
                    {`Error - ${failMsg}`}
                </Alert>
            </div>
            
            ) : (<></>)}
            <div className='flex items-center flex-col p-6 w-3/4 md:w-1/2 lg:w-1/3 bg-gray-700 rounded-3xl h-fit md:mt-16 shadows-2xl' style={{ boxShadow: '0px 0px 60px 25px rgba(128, 50, 220, 0.5)' }}>
                <h2 className='text-black text-4xl sm:text-5xl md:text-6xl m-4 font-black text-gradient xl:p-2'>{pathname == "signup" ? "Sign Up" : "Login"}</h2>
                <form onSubmit={handleSubmitForm} className='flex flex-col w-full px-4 py-10 shadow-xl rounded-xl'>
                    <div className='flex flex-col mt-3'>
                        <label htmlFor="username" className='block mb-2 text-2xl lg:text-3xl font-bold text-black opacity-50'>Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder='username'
                            className='rounded-lg block w-full h-12 sm:h-14 md:h-16 p-2.5 bg-gray-600 border-purple-700 placeholder-gray-700 outline outline-gray-600 text-black font-semibold text-md sm:text-lg md:text-xl'
                        />
                    </div>
                    {pathname == "signup" ? (
                        <div className='flex flex-col mt-3'>
                            <label htmlFor="email" className='block mb-2 text-2xl lg:text-3xl font-bold text-black ite py-2 md:py-4 lg:py-6 opacity-50'>Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='email'
                                className='rounded-lg block w-full h-12 sm:h-14 md:h-16 p-2.5 bg-gray-600 border-purple-700 placeholder-gray-700 outline outline-gray-600 text-black font-semibold text-md sm:text-lg md:text-xl'
                            />
                        </div>
                    ) : (<></>)}
                    <div className='flex flex-col mt-3'>
                        <label htmlFor="password" className='block mb-2 text-2xl lg:text-3xl font-bold text-black ite py-2 md:py-4 lg:py-6 opacity-50'>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='password'
                            className='rounded-lg block w-full h-12 sm:h-14 md:h-16 p-2.5 bg-gray-600 border-purple-700 placeholder-gray-700 outline outline-gray-600 text-black font-semibold text-md sm:text-lg md:text-xl'
                        />
                    </div>
                    {pathname === "signup" ? (
                        <div className='flex flex-col mt-3'>
                            <label htmlFor="confirmPassword" className='block mb-2 text-2xl lg:text-3xl font-bold text-black ite py-2 md:py-4 lg:py-6 opacity-50'>Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder='confirmed password'
                                className='rounded-lg block w-full h-12 sm:h-14 md:h-16 p-2.5 bg-gray-600 border-purple-700 placeholder-gray-700 outline outline-gray-600 text-black font-semibold text-md sm:text-lg md:text-xl'
                            />
                        </div>
                    ) : (<></>)}
                    {pathname === 'signup' ? (
                    <button type="submit" className='w-36 mx-auto mt-8 mb-4 p-4 rounded-xl justify-center text-white text-2xl block bg-[#9919d1] shadow-lg hover:shadow-2xl md:p-6'>
                        {signupIsLoading ? 'Signing up...' : 'Sign up'}
                    </button>
                    ) : 
                    (<button type="submit" className='w-36 mx-auto mt-12 p-4 rounded-xl justify-center text-white text-2xl block bg-[#9919d1] shadow-lg hover:shadow-2xl md:p-6'>
                    {loginIsLoading ? 'Logging in...' : 'Login'}
                </button>)}
                </form>
            </div>
        </main>
    );
}

export default AuthForm;
