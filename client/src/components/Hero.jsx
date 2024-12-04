import Image from '../assets/image.png'

export default function Hero() {
    return (
      <div className="relative h-80  sm:h-96 lg:h-[30rem]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${Image})`, // Replace with your image URL
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
  
        {/* Text Overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            <span className="block">Find out how well your resume</span>
            <span className="block">matches a job description.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-lg lg:text-xl text-gray-300 max-w-xl">
            Upload your resume and a job description to see how they align.
          </p>
        </div>
      </div>
    );
  }
  