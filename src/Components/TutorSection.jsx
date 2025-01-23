import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { useState } from "react";
import { FaStar } from "react-icons/fa";


const TutorSection = () => {

  const axiosSecure = UseAxiosSecure();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: tutors = [] } = useQuery({
    queryKey: ['tutors'], // Updated queryKey for better clarity
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data.filter((user) => user.role === 'Tutor'); 
    },
  });

  console.log(tutors)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tutors.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + tutors.length) % tutors.length
    );
  };

  return (
    <div>
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">User Testimonials</h2>
          <div className="relative overflow-hidden">
            <div
              className="transition-transform duration-700 transform flex"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {tutors.map((user, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 mx-auto flex flex-col items-center w-full gap-4 sm:max-w-sm"
                  style={{ flexShrink: 0 }}
                >
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-20 h-20 rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {user.displayName}
                  </h3>
                  {/* <div className="flex mb-2">
                    {[...Array(user.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div> */}
                  {/* <p className="text-gray-600 text-sm text-center">
                    {user.review}
                  </p> */}
                </div>
              ))}
            </div>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 hidden sm:block"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 hidden sm:block"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorSection;