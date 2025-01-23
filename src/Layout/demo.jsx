// src/components/StudyMaterials.js
import { useEffect, useState } from 'react';
import useBooked from '../../../Hooks/useBooked';
import axios from 'axios';

const Materials = () => {

  // const [booked] = useBooked();
  // const [materials, setMaterials] = useState()
  // const [bookeds, setBookeds] =useState()
  // console.log(bookeds)


  // useEffect(() => {
  //   axios.get(`http://localhost:5000/materials/studySession/${bookeds.bookId}`)
  //     .then(res => {
  //     console.log(res.data)
  //   })
  //   booked.map(book => {
  //     setBookeds(book)
  //   })
  // },[booked, bookeds])

  const fakeBookedSessions = [
    { id: 'session1', title: 'Math Basics', materials: [
      { id: 'mat1', imageUrl: 'https://via.placeholder.com/150', driveLink: 'https://drive.google.com/example1' },
      { id: 'mat2', imageUrl: 'https://via.placeholder.com/150', driveLink: 'https://drive.google.com/example2' }
    ]},
    { id: 'session2', title: 'Physics Fundamentals', materials: [
      { id: 'mat3', imageUrl: 'https://via.placeholder.com/150', driveLink: 'https://drive.google.com/example3' },
      { id: 'mat4', imageUrl: 'https://via.placeholder.com/150', driveLink: 'https://drive.google.com/example4' }
    ]}
  ];

  const [selectedSession, setSelectedSession] = useState(null);

  const handleSessionClick = (sessionId) => {
    setSelectedSession(sessionId);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Your Study Materials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedSession === null ? (
          fakeBookedSessions.map(session => (
            <div
              key={session.id}
              className="p-4 bg-white shadow-md rounded-md cursor-pointer hover:bg-blue-100"
              onClick={() => handleSessionClick(session.id)}
            >
              <h2 className="text-lg font-semibold">{session.title}</h2>
            </div>
          ))
        ) : (
          <div>
            <button
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => setSelectedSession(null)}
            >
              Back to Sessions
            </button>
            {fakeBookedSessions
              .find(session => session.id === selectedSession)
              .materials.map(material => (
                <div
                  key={material.id}
                  className="p-4 bg-white shadow-md rounded-md mb-4"
                >
                  <img
                    src={material.imageUrl}
                    alt="Material Preview"
                    className="w-full h-auto rounded-md mb-2"
                  />
                  <a
                    href={material.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline block mb-2"
                  >
                    View on Google Drive
                  </a>
                  <a
                    href={material.imageUrl}
                    download
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Download Image
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Materials;


