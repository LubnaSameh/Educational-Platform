// App.js
import React, { useState, useEffect, useRef } from 'react';
// npm install react-router-dom
import { BrowserRouter as Router, Routes, Route, Navigate,useLocation } from 'react-router-dom';
import Articles from './Articles';
import Jobs from './Jobs';
import Users from './users';
import ApplicantJobs from './ApplicantJobs';
import UsersStudents from './usersStudent';
import JobForm from './JobForm';
import ArticleForm from './ArticleForm.js';
import PythonCourseLayout from './PythonCourseLayout';
import PythonCourseDetails from './PythonCourseDetails';
import AddUserForm from './AddUserForm.js';
import CourseForm from './CourseForm .js';
import CustomNavbar from './Navbar';
import Footer from './footer';
import Courses from './courses';
import Sidebar from './Sidebar';
import { Slider } from './SliderCv';
import CVComponent from './CVComponent.js';
import { FormProvider } from './CvFormAutoEdit'; // تأكد من استيراد FormProvider
import { Form1, Form2, Form3, Form4, Form5, Form6, Form7, Form8 } from './AllFormsCv';
import ButtonGroupComponent from './ButtonGroupComponent.js';
import CoursesPage from './CoursesPage'; // استدعاء الصفحة الخاصة بالكورسات
import CertificateForm from './CertificateForm.js';
import ExamForm from './ExamDetails.js';
import ExamsPage from './ExamPage.js';
import '@fortawesome/fontawesome-free/css/all.min.css';



function Layout() {
  const [activePage, setActivePage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.includes('/admins')) setActivePage('Admins');
    else if (path.includes('/editors')) setActivePage('Editors');
    else if (path.includes('/instructors')) setActivePage('Instructors');
    else if (path.includes('/students')) setActivePage('Students');
    else if (path.includes('/users/add')) setActivePage('Add User');



    /* Articles */
    else if (path.includes('/articles/published')) setActivePage('Published Articles');
    else if (path.includes('/articles/scheduled')) setActivePage('Scheduled Articles');
    else if (path.includes('/articles/drafts')) setActivePage('Articles - Saved Drafts');
    else if (path.includes('/articles/add')) setActivePage('Add Article');

    /* Jobs */
    else if (path.includes('/jobs/published')) setActivePage('Published Jobs');
    else if (path.includes('/jobs/drafts')) setActivePage('Jobs - Saved Drafts');
    else if (path.includes('/jobs/add')) setActivePage('Add Job');

    /* Courses */
    else if (path.includes('/courses/published')) setActivePage('Published Courses');
    else if (path.includes('/courses/scheduled')) setActivePage('Scheduled Courses');
    else if (path.includes('/courses/drafts')) setActivePage('Courses - Saved Drafts');
    else if (path.includes('/courses/add')) setActivePage('Add Course');
    else if (path.includes('/courses/upload-certificate')) setActivePage('Upload Certificate');

    else setActivePage('');
  }, [location]);



  return (
    <div className="container">
      <div className="row">
        <Sidebar activePage={activePage} />
        <div className="col-lg-9 col-md-12">
          <Routes>
          <Route path="/" element={<Navigate to="/admins" />} />
            <Route path="/admins" element={<Users />} />
            <Route path="/editors" element={<Users />} />
            {/* <Route path="/instructors" element={<JobForm />} /> */}
            <Route path="/students" element={<UsersStudents />} />
            <Route path="/users/add" element={<FormProvider><AddUserForm /></FormProvider>} />

            {/* Articles Routes */}
            <Route path="/articles/published" element={<Articles />} />
            <Route path="/articles/scheduled" element={<Articles />} />
            <Route path="/articles/drafts" element={<Articles />} />
            <Route path="/articles/add" element={<FormProvider><ArticleForm /></FormProvider>} />

            {/* Jobs Routes */}
            <Route path="/jobs/published" element={<Jobs />} />
            <Route path="/jobs/drafts" element={<ApplicantJobs />} />
            <Route path="/jobs/add" element={<FormProvider><JobForm /></FormProvider>} />

            {/* Courses Routes */}
            <Route path="/courses/published" element={<Courses />} />
            <Route path="/courses/scheduled" element={<Courses />} />
            <Route path="/courses/drafts" element={<Courses />} />
            <Route path="/courses/upload-certificate" element={<FormProvider> <CertificateForm /></FormProvider>} />
            <Route path="/courses/add" element={<FormProvider><CourseForm /></FormProvider>} />

          </Routes>

        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeForm, setActiveForm] = useState(0);

  const componentRef = useRef();

  const handleSlideChange = (slideIndex) => {
    setActiveForm(slideIndex);
  };

  return (
    <Router>
      <CustomNavbar />
      <Layout />
      <CoursesPage />
      <div className="container  ">
        <Slider handleSlideChange={handleSlideChange} activeForm={activeForm} />
        <FormProvider>
          <div className="row mt-4  bg-form-cv mx-auto rounded px-0">
            {/* Left side: Form */}
            <div className="col-md-6 pe-md-0 ">
              {activeForm === 0 && <Form1 />}
              {activeForm === 1 && <Form2 />}
              {activeForm === 2 && <Form3 />}
              {activeForm === 3 && <Form4 />}
              {activeForm === 4 && <Form5 />}
              {activeForm === 5 && <Form6 />}
              {activeForm === 6 && <Form7 />}
              {activeForm === 7 && <Form8 />}
            </div>
            {/* Right side: CV Preview */}
            <div className="col-md-6">

              <CVComponent ref={componentRef} />
            </div>
          </div>
          <ButtonGroupComponent componentRef={componentRef} activeForm={activeForm} setActiveForm={setActiveForm} />
        </FormProvider>
      </div>

      <FormProvider>
        <ExamForm />
      </FormProvider>

      <PythonCourseLayout />
      <PythonCourseDetails />
    <ExamsPage/>
      <Footer />
    </Router>

  );
}

export default App;