import Card from "./Card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const HomeCard = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: studySessions = [] } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async ({ signal }) => {
      const res = await axios.get("http://localhost:5000/studySection", { signal });
      return res.data;
    },
  });

  console.log(studySessions)

  const totalPages = Math.ceil(studySessions.length / itemsPerPage);

  const currentData = studySessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold text-center my-10">All Study Section</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.map((AllData) => (
          <Card key={AllData._id} AllData={AllData}></Card>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
