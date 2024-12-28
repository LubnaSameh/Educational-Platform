import React, { useState } from "react";

// Pagination - الكومبوننت المسؤولة عن التنقل بين الصفحات
import Pagination from "./Pagination";

const ExamsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 3; // عدد الامتحانات في كل صفحة

  // Exams data - بيانات الامتحانات
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
  ];

  // Combine all exams - جمع كل الامتحانات
  const allExams = [...upcomingExams, ...previousExams];
  const totalPages = Math.ceil(allExams.length / examsPerPage);

  // Pagination slices - تحديد الامتحانات المعروضة حسب الصفحة
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = allExams.slice(indexOfFirstExam, indexOfLastExam);

  return (
    <div className="container py-5">
      {/* Upcoming Exams - الامتحانات القادمة */}
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

     {/* Previous Exams - الامتحانات السابقة */}
<h4 className="text-white mb-4 pt-5">Previous Exams</h4>
{previousExams.map((exam, i) => (
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


      {/* Pagination - أزرار التنقل بين الصفحات */}
      <div className="mt-4 ">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ExamsPage;
