import { useState, useEffect } from "react";
import Card from "./Card";


const HomeCard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0); 
  const itemsPerPage = 6; 

  const fetchData = async (page) => {
    try {
      const res = await fetch(`http://localhost:5000/studySection?page=${page}&limit=${itemsPerPage}`);
      const result = await res.json();
      setData(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  console.log(data)

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
         {data.map((AllData) => (
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
