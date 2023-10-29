import Navbar from '../components/Navbar.tsx'
import AuthForm from '../components/AuthForm.js'
import Footer from '../components/Footer.tsx'

const AuthPage = () => {
  return (
    <div className='overflow-x-hidden'>
        <Navbar />
        <AuthForm />
        <Footer/>
    </div>
  )
}

export default AuthPage