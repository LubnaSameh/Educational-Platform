import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { filterData, SearchComponent } from './SearchFunction';

const CourseList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5;

    // البيانات الأساسية
    const courses = [
        { title: "Python for Beginners", instructor: "Mohammed Nour", date: "Wednesday, June 7th", lessons: "12 lessons" },
        { title: "JavaScript Essentials", instructor: "Ahmed Ali", date: "Thursday, June 8th", lessons: "15 lessons" },
        { title: "React Basics", instructor: "Sara Mohamed", date: "Friday, June 9th", lessons: "10 lessons" },
        { title: "Data Structures in C++", instructor: "Khaled Hassan", date: "Saturday, June 10th", lessons: "8 lessons" },
        { title: "Node.js Advanced", instructor: "Yasser Samir", date: "Sunday, June 11th", lessons: "10 lessons" },
        { title: "Machine Learning", instructor: "Rania Mostafa", date: "Monday, June 12th", lessons: "20 lessons" },
    ];

    const otherCourses = [
        { title: "HTML Basics", instructor: "Mohammed Nour", date: "Thursday, June 8th", lessons: "12 lessons", level: 1 },
        { title: "Graphic Design", instructor: "Mohammed Nour", date: "Thursday, June 8th", lessons: "17 lessons", level: 1 },
        { title: "UI UX Design", instructor: "Mohammed Nour", date: "Thursday, June 8th", lessons: "12 lessons", level: 2 },
        { title: "Node.js Basics", instructor: "Ahmed Ali", date: "Friday, June 9th", lessons: "10 lessons", level: 4 },
        { title: "React Basics", instructor: "Sara Ahmed", date: "Saturday, June 10th", lessons: "15 lessons", level: 5 },
        { title: "Python for Beginners", instructor: "Yasser Ali", date: "Sunday, June 11th", lessons: "20 lessons", level: 3 },
    ];

    // فلترة قسم "Other Courses"
    const filteredOtherCourses = filterData(otherCourses, searchTerm, ['title', 'instructor', 'date', 'lessons', 'level']);

    // حساب عدد الصفحات لـ "Other Courses"
    const totalPages = Math.ceil(filteredOtherCourses.length / coursesPerPage);

    // تحديد الكورسات التي ستعرض في الصفحة الحالية
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredOtherCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', checkMobile);
        checkMobile();

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleNext = () => {
        if (currentIndex < courses.length - (isMobile ? 1 : 4)) {
            setCurrentIndex(currentIndex + (isMobile ? 1 : 4));
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - (isMobile ? 1 : 4));
        }
    };

    return (
        <div className="py-5">
            {/* قسم "New Courses" */}
            <div className="d-flex container justify-content-between align-items-center mx-auto">
                <h4 className="text-white">New Courses</h4>
                <div className="pagination">
                    <a href="#" className="arrow" onClick={(e) => { e.preventDefault(); handlePrev(); }}>
                        <i className="fas fa-chevron-left" style={{ color: '#BF9530' }}></i>
                    </a>
                    <a href="#" className="arrow ms-2" onClick={(e) => { e.preventDefault(); handleNext(); }}>
                        <i className="fas fa-chevron-right" style={{ color: '#BF9530' }}></i>
                    </a>
                </div>
            </div>

            <div className="container mb-3">
                <div className="row">
                    {courses.slice(currentIndex, currentIndex + (isMobile ? 1 : 4)).map((course, index) => (
                        <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="card text-white backgroundRightDiv px-0 mx-0 w-100 mt-3 mt-xl-0">
                                <div className="position-relative p-3">
                                    <img src="https://via.placeholder.com/300x150" className="card-img-top" alt="course" />
                                    <div className="position-absolute top-0 start-0 end-0 bottom-0 m-3 d-flex align-items-end" style={{ background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 40%, transparent 100%)' }}>
                                        <div className="ps-2 w-100 text-start">
                                            <h5 className="card-title mb-0 text-white">{course.title}</h5>
                                            <p className="card-text Browse mb-0">Instructor: {course.instructor}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="card-text fs-6">
                                        <i className="bi bi-calendar Browse me-2"></i> {course.date} <br />
                                        <i className="bi bi-journal-bookmark Browse me-2"></i> {course.lessons}
                                    </p>
                                    <a href="#" className="btn-gold w-100 text-center d-block">ENROLL</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* قسم "Other Courses" */}
            <div className="container mt-5 pt-5">
                <div className="d-flex container flex-column flex-md-row justify-content-between mb-4 align-items-start mx-auto px-0">
                    <h4 className="text-white mb-0">Other Courses</h4>
                    <div className="col-12 col-md-auto">
                        <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search in Other Courses" />
                    </div>
                </div>

                {isMobile ? (
                    <div className="row">
                        {currentCourses.map((course, index) => (
                            <div key={index} className="col-12 mb-3">
                                <div className="card backgroundRightDiv p-3">
                                    <img src="https://via.placeholder.com/100x100" alt="course" className="w-100 mb-3" />
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <h5 className="mb-0 text-white">{course.title}</h5>
                                        <div className="text-white fw-bold">LEV. {course.level}</div>
                                    </div>
                                    <p className="text-light-emphasis mb-1">{course.lessons}</p>
                                    <p className="Browse">Instructor: {course.instructor}</p>
                                    <p className="Browse">Start Date: {course.date}</p>
                                    <a href="#" className="btn-gold w-100 text-center py-2">ENROLL</a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <table className="table backgroundRightDiv table-borderless rounded">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className='ps-2'> Course</div>
                            </th>
                            <th scope="col" className="col-auto" style={{ width: '180px' }}>
                                <div className="pt-3">Start Date</div>
                            </th>
                            <th scope="col">
                                <div className='text-center '>Level</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOtherCourses.map((course, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img src="https://via.placeholder.com/80x60" alt="course" className="me-3 ms-2 mb-3" style={{ width: '80px', height: '70px' }} />
                                        <div>
                                            <h6 className="mb-1 text-white fw-bold">{course.title}</h6>
                                            <p className="text-light-emphasis fw-lighter mb-1">{course.lessons}</p>
                                            <p className="card-text Browse mb-0 ">Instructor <span className="text-white">: {course.instructor}</span></p>
                                        </div>
                                    </div>
                                </td>
                                <td className='align-middle'>{course.date}</td>
                                <td className="align-middle mx-auto text-center">{course.level}</td>
                                <td className="d-flex flex-column align-items-center pe-0 ">
                                    <a href="#" className="btn-gold text-center w-75 px-1 mb-2">ENROLL</a>
                                    <a href="#" className="text-light" style={{ textDecoration: 'none' }}>View Details</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default CourseList;
