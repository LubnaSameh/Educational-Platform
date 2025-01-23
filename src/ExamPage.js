import React, { useState } from "react";
import Pagination from "./Pagination";

const ExamsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 3; // Number of exams per page

  // Data for upcoming exams
  const upcomingExams = [
    {
      date: "Wednesday, June 7th",
      time: "12:30 PM",
      title: "Introduction to Data Analysis",
      instructor: "Mohammed Nour",
      level: "LEV. 1",
      score: "NA",
    },
  ];

  // Data for previous exams
  const previousExams = [
    {
      date: "Monday, June 5th",
      time: "12:30 PM",
      title: "System analysis and design",
      instructor: "Sarah Ahmed",
      level: "LEV. 1",
      score: "90/100",
    },
    {
      date: "Saturday, June 3rd",
      time: "12:30 PM",
      title: "Introduction to Web Development",
      instructor: "Alaa Sameer",
      level: "LEV. 1",
      score: "99/100",
    },
    {
      date: "Saturday, June 3rd",
      time: "12:30 PM",
      title: "Introduction to Web Development",
      instructor: "Alaa Sameer",
      level: "LEV. 1",
      score: "99/100",
    },
    {
      date: "Friday, June 2nd",
      time: "11:30 AM",
      title: "Advanced Database Systems",
      instructor: "Hassan Ali",
      level: "LEV. 2",
      score: "85/100",
    },
    {
      date: "Thursday, June 1st",
      time: "09:30 AM",
      title: "Machine Learning Basics",
      instructor: "Noha Ahmed",
      level: "LEV. 2",
      score: "88/100",
    },
  ];

  const totalPages = Math.ceil(previousExams.length / examsPerPage);

  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = previousExams.slice(indexOfFirstExam, indexOfLastExam);

  // Function to handle page changes
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container py-5">
      {/* Upcoming Exams */}
      <h4 className="text-white mb-4">Upcoming Exams</h4>
      {upcomingExams.map((exam, i) => (
        <div key={i} className="backgroundRightDiv p-4 rounded mb-3">
          {/* Row مع تقسيم أعمدة عشان كله يبقى في نفس السطر */}
          <div className="d-flex flex-column flex-md-row align-items-start  ">
            {/* Date & Time - التاريخ والوقت */}
            <div className="col-md-3 text-white">
              <p className="mb-1">
                <i className="bi bi-calendar3 Browse me-2"></i>
                {exam.date}
              </p>
              <p className="mb-0">
                <i className="bi bi-clock Browse me-2"></i>
                {exam.time}
              </p>
            </div>

            {/* Title & Instructor - العنوان والمحاضر */}
            <div className="col-md-4 text-white mt-4 mt-md-0">
              <h5 className="mb-1">{exam.title}</h5>
              <p className="card-text Browse mb-0">
                Instructor{" "}
                <span className="text-white">: {exam.instructor}</span>
              </p>
            </div>

            {/* Level - المستوى */}
            <div className="col-12 col-md-3 mt-4 mt-md-0 d-flex justify-content-between justify-content-md-around ">
              {/* Level */}
              <div className=" text-center fw-bold text-white">
                {exam.level}
              </div>
              {/* Score */}
              <div className=" text-center text-white">{exam.score}</div>
            </div>

            {/* Button - زرار الانضمام للامتحان */}
            <div className="col-12 col-md-2 d-flex justify-content-md-end mt-4 mt-md-0">
              <button className="col-12 col-md-auto  bg-grey btn-gold text-uppercase px-md-3">
                Join Exam
              </button>
            </div>
          </div>
        </div>
      ))}


      {/* Previous Exams */}
      <h4 className="text-white mb-4 pt-5">Previous Exams</h4>
      {currentExams.map((exam, i) => (
     <div key={i} className="backgroundRightDiv p-4 rounded mb-3">
    {/* Row مع تقسيم أعمدة عشان كله يبقى في نفس السطر */}
    <div className="d-flex flex-column flex-md-row align-items-start">
      {/* Date & Time - التاريخ والوقت */}
      <div className="col-md-3 text-white">
        <p className="mb-1">
          <i className="bi bi-calendar3 Browse me-2"></i>
          {exam.date}
        </p>
        <p className="mb-0">
          <i className="bi bi-clock Browse me-2"></i>
          {exam.time}
        </p>
      </div>

      {/* Title & Instructor - العنوان والمحاضر */}
      <div className="col-md-4 text-white mt-4 mt-md-0">
        <h5 className="mb-1">{exam.title}</h5>
        <p className="card-text Browse mb-0">
          Instructor{" "}
          <span className="text-white">: {exam.instructor}</span>
        </p>
      </div>

      {/* Level - المستوى */}
      <div className="col-12 col-md-3 mt-4 mt-md-0 d-flex justify-content-between justify-content-md-around">
        {/* Level */}
        <div className=" text-center fw-bold text-white">
          {exam.level}
        </div>
        {/* Score */}
        <div className=" text-center text-white">{exam.score}</div>
      </div>

      {/* Button - زرار الانضمام للامتحان */}
      <div className="col-12 col-md-2 d-flex justify-content-md-end mt-4 mt-md-0">
        <button className="col-12 col-md-auto  bg-grey btn-gold text-uppercase px-md-3">
          Finished
        </button>
      </div>
    </div>
  </div>
))}



      {/* Pagination */}
      <div className="mt-4 ">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ExamsPage;
