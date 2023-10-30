import heroImg from '/webp/lines.webp'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { textVariant } from '../utils/motion';

const Hero: React.FC = () => {
  return (
    <main className="relative bg-cover bg-center min-h-screen flex items-center justify-center w-screen">
      <motion.div
        className="text-white z-10 text-center flex flex-col items-center mt-[-32px]"
        initial="hidden"
        whileInView="show"
        variants={textVariant(0)}
        viewport={{ once: true }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl text-gradient font-bold p-6 header-font">The best space API</h1>
        <p className="w-3/4 sm:w-1/2 text-lg md:text-xl">We are providing the fastest space data in the entire Universe.</p>
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="sm:w-1/4 w-1/2 mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-800 text-white rounded-full text-xl focus:outline-none transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200"
        >
          <button>Learn More</button>
        </Link>
      </motion.div>
      <img src={heroImg} alt="Hero Background" className="w-screen h-screen absolute inset-0 object-cover" />
      <img src={heroImg} alt="Hero Background" className="absolute inset-0 object-cover w-full h-full" style={{ transform: 'scaleY(-1.1) scaleX(-1)' }} />

    </main>
  )
}

export default Hero;
