import React from 'react';
import { AiOutlineFileText } from 'react-icons/ai'; // Import the icon
// npm install react-icons --save

const PythonCourseLayout = () => {
    return (
        <div className="container mt-5 mb-3 ">
            <div className="row">

                {/* Left div */}
                <div className="col-12 col-md-7 col-lg-8 mb-4 mb-md-0 pe-md-5 ">
                    <div className="px-1 text-white ">
                        <h5 className="text-uppercase d-block header-title fs-6 fw-lighter">Tech
                            <div className="linee me-auto mx-md-0 mb-md-2 mt-2"></div>
                        </h5>
                        <p className="panel-date mb-3 mb-md-5 fs-7 d-md-none mt-0">6th June 2023</p>
                        <h2>Python Programming Language</h2>
                        <p>
                            <span className="instructor-highlight">Instructor :</span> Mohammed Nour
                        </p>

                        <div className="image-overlay-container mb-4 ">
                            <img src="/images/img_placeholder.jpg" alt="Course" className="img-fluid  " />
                            <div className="image-overlay">

                            </div>
                        </div>

                        <h4 className="mb-3 mt-5 ">Introduction</h4>
                        <p >
                            Python is a versatile and powerful programming language that is widely used in various fields such as web development, data science, artificial intelligence, and more. This course will provide you with a comprehensive introduction to Python, covering the basics and advancing to more complex topics.
                        </p>

                        {/* Lessons */}
                        <h4 className="mb-3 mt-5">Lessons</h4>
                        <div className="accordion rounded w-100" id="lessonsAccordion">
                            <div className="accordion-item w-100 mb-2">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        Introduction to Python
                                        <i className="fa fa-plus iconPython ms-auto"></i>
                                        <i className="fa fa-times iconPython"></i>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#lessonsAccordion">
                                    <div className="accordion-body">
                                        In this lesson, you will learn about the origins of Python, its key features, and why it is such a popular language among developers.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item mb-1">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button py-4 collapsed w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Functions
                                        <i className="fa fa-plus iconPython ms-auto"></i>
                                        <i className="fa fa-times iconPython"></i>
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#lessonsAccordion">
                                    <div className="accordion-body">
                                        Learn about defining and using functions in Python to create reusable code blocks that perform specific tasks.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item" style={{ width: '100% !important' }}>
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed py-4 w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Arrays
                                        <i className="fa fa-plus iconPython ms-auto"></i>
                                        <i className="fa fa-times iconPython"></i>
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#lessonsAccordion">
                                    <div className="accordion-body">
                                        This lesson introduces arrays in Python, explaining how to store and manipulate collections of data efficiently.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right div */}
                <div className="col-12 col-md-5 col-lg-4 ps-md-5 ">
                    <div className="ps-3 pe-1 text-white mt-4">
                        {/* New Section with Icons */}
                        <div className="d-flex justify-content-between ps-2 ps-md-0 parentIconTitleSubTitle mb-3">
                            <div className="d-flex IconTitleSubTitle rounded px-3 py-2 me-2  px-sm-5 me-sm-0 px-md-2 px-lg-2 me-md-2 me-lg-1  px-xl-4  pe-xxl-5  align-items-center">
                                <svg className="me-3" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="#BF9530" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="4" y="4" width="16" height="19" rx="2" ry="2" />
                                    <line x1="8" y1="10" x2="16" y2="10" />
                                    <line x1="8" y1="14" x2="16" y2="14" />
                                    <line x1="9" y1="18" x2="14" y2="18" />
                                </svg>
                                <div className="d-flex flex-column">
                                    <span className="fw-bold">Lessons</span>
                                    <div className="fw-light">12</div>
                                </div>
                            </div>
                            <div className="d-flex IconTitleSubTitle rounded px-3 py-2  px-sm-5 px-md-2 px-lg-2 px-xl-4  pe-xxl-5 align-items-center">

                                <svg className="me-3" xmlns="http://www.w3.org/2000/svg" width="34" height="33" viewBox="0 0 24 24" fill="none" stroke="#BF9530" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="10" width="4" height="13" rx="1" />
                                    <rect x="10" y="6" width="4" height="17" rx="1" />
                                    <rect x="17" y="13" width="4" height="10" rx="1" />
                                </svg>

                                <div className="d-flex flex-column">
                                    <span className="fw-bold">Level</span>
                                    <div className="fw-light">Beginner</div>
                                </div>


                            </div>

                        </div>

                        <div className='mt-4'>
                            <p className="mb-2 fw-semibold"><i className="fas fa-users me-2"></i>Students: <span className="fw-light">20</span></p>
                            <p className="mb-2 fw-semibold"><i className="fas fa-language me-2"></i>Language: <span className="fw-light">Arabic</span></p>
                            <p className="mb-2 fw-semibold"><i className="fas fa-clock me-2"></i>Duration: <span className="fw-light">13 hours</span></p>
                            <p className="mb-2 fw-semibold"><i className="fas fa-calendar-alt me-2"></i> Start Date: <span className="fw-light">Wednesday, June 7th</span></p>
                            <p className="mb-2 fw-semibold"><i className="fas fa-certificate me-2"></i>Certificate: <span className="fw-light">Upon completion</span></p>
                        </div>
                    </div>

                    <button className="btn btn-gold w-100 text-uppercase mb-3 mb-lg-4  mt-3 mt-lg-3">Enroll</button>

                   
                    <div className="px-4 pb-1 pt-4 rounded backgroundRightDiv text-white mt-5">
                        <h4 className="mb-3">Assessment</h4>
                        <p>
                            Students will be assessed through a combination of quizzes, coding assignments, and a final project that demonstrates their understanding of Python programming.
                        </p>
                    </div>

                    
                    <div className="p-4 backgroundRightDiv mt-0 rounded text-white">
                        <h4 className="mb-3">Requirements</h4>
                        <ul className="px-3 px-md-4">
                            <li>Basic knowledge of programming concepts is helpful but not required</li>
                            <li>A computer with Python installed</li>
                            <li>Access to an internet connection for downloading course materials</li>
                        </ul>
                        <h4 className="mb-3 mt-5">Materials</h4>
                        <p>
                            All course materials, including code examples and project files, will be provided. Students will also have access to online resources for further learning.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PythonCourseLayout;
