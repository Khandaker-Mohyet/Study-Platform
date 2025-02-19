import banner from '../../assets/Banner.jpg'

const Banner = () => {
  return (
    <div className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Collaborative Study Platform
        </h1>
        <h1 className='text-white lg: w-6/12 md:8/12 mx-auto'>
          This project focuses on creating a Collaborative Study Platform that connects students, tutors, and administrators to streamline study session scheduling, resource sharing, and user management. This is 
        </h1>
        
      </div>
    </div>
  );
};

export default Banner;