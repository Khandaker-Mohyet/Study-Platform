import { useState } from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { Link } from "react-router-dom";
import Card from "./Card";

const HomeCard = () => {
  const [data, setData] = useState([]);

  const axiosPublic = UseAxiosPublic()


  axiosPublic.get('/studySection')
    .then((res) => setData(res.data))

  

  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {data.map((AllData) => (
      <Card key={AllData._id} AllData={AllData} />
    ))}
  </div>
);
};

export default HomeCard;
