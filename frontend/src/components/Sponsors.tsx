import amazon from '/webp/amazon.webp'
import americanExpress from '/webp/american-express.webp'
import forbes from '/webp/forbes.webp'
import visa from '/webp/visa.webp'
import vogue from '/webp/vogue.webp'

const images = [
  amazon,
  americanExpress,
  forbes,
  visa,
  vogue
]

const Sponsors: React.FC = () => {
  return (
    <section className="w-11/12 mx-auto pt-2 pb-10 sm:mt-8">
      <div className='text-white font-extrabold text-2xl sm:text-4xl text-center p-7 mb-4'>
        Our sponsors
      </div>
      <div className="flex flex-row flex-wrap gap-6 lg:gap-20 justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-white items-center flex sm:p-3 p-1 border border-blue-400 sm:rounded-2xl rounded-lg sponsor-shadow scale-110"
          >
            <img
              alt={`Brand ${index}`}
              src={image}
              className='object-contain h-12 w-20 sm:w-34 sm:h-22'
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Sponsors
