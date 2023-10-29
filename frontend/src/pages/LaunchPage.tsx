import Navbar from '../components/Navbar.tsx'
import Hero from '../components/Hero.tsx'
import Sponsors from '../components/Sponsors.tsx'
import Advantages from '../components/Advantages.tsx'
import About from '../components/About.tsx'
import CallToAction from '../components/CallToAction.tsx'
import MadeBy from '../components/MadeBy.tsx'
import Footer from '../components/Footer.tsx'


const LaunchPage = () => {
    return (
        <div className='overflow-x-hidden'>
            <Navbar />
            <Hero />
            <About />
            <Advantages />
            <CallToAction />
            <Sponsors />
            <MadeBy />
            <Footer />
        </div>
    )
}

export default LaunchPage