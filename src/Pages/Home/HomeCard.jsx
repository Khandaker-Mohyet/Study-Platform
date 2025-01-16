import { useEffect, useState } from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const HomeCard = () => {
  const [data, setData] = useState([]);

  const axiosPublic = UseAxiosPublic()


  axiosPublic.get('/studySection')
    .then((res) => setData(res.data))

  const currentDate = new Date(); // Define currentDate

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((session, index) => {
        const {
          sessionTitle,
          sessionDescription,
          registrationStartDate,
          registrationEndDate,
        } = session;

        const registrationStart = new Date(registrationStartDate);
        const registrationEnd = new Date(registrationEndDate);
        const isOngoing =
          currentDate >= registrationStart && currentDate <= registrationEnd;

        return (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <h3 className="text-lg font-bold text-gray-800">{sessionTitle}</h3>
            <p className="text-gray-600 my-2">{sessionDescription}</p>
            <div className="flex items-center justify-between">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  isOngoing
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white cursor-not-allowed"
                }`}
                disabled={!isOngoing}
              >
                {isOngoing ? "Ongoing" : "Closed"}
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Read More
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeCard;
