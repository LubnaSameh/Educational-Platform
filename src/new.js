import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDropdown from './useDropdown';  // Importing the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // استيراد FontAwesome
import { faNewspaper, faBriefcase, faTasks, faSave, faCalendarAlt, faBook, faUserPlus, faPenNib, faGraduationCap, faFileUpload, faPen, faFileContract, faChalkboardTeacher, faUserTie } from '@fortawesome/free-solid-svg-icons'; // استخدام faGraduationCap و faPen

const Sidebar = ({ activePage }) => {
    const [dropdownContent, setDropdownContent] = useState('Published Jobs'); // Initial dropdown content
    const [activeTitle, setActiveTitle] = useState('');


    const { dropdownStates, toggleDropdown, closeAllDropdowns, dropdownRef } = useDropdown({

        Users: false,
        Articles: false,
        Jobs: false,
        Courses: false
    });

    const handleTitleClick = (title) => {
        setActiveTitle(title);
        switch (title) {
            case 'Users':
                setDropdownContent('Admins');
                break;
            case 'Articles':
                setDropdownContent('Published Articles');
                break;
            case 'Jobs':
                setDropdownContent('Published Jobs');
                break;
            case 'Courses':
                setDropdownContent('Published Courses');
                break;
            default:
                setDropdownContent('');
                break;
        }
    };


    return (
        <>
            <div className="top-info text-white mb-0  pb-5 pt-3  ">
                <div className="admin-panel-title">
                    Admin Panel
                    <div className="lineP "></div>
                </div>
                <p className="panel-date mb-0 mb-md-5">6th June 2023</p>
            </div>

            <div className="col-lg-3 col-md-12 mb-4 mb-md-5 ">
                <div className="left-content d-flex flex-row d-md-block">


                    <ul className="sidebar-list justify-content-center mx-auto my-0 pt-2 py-md-3 px-3 d-flex flex-row flex-md-column">

                        {/* Users Section */}
                        <li className={`title ${['Admins', 'Editors', 'Instructors', 'Students', 'Add User'].includes(activePage) ? 'active ' : ''} d-none d-md-block`} onClick={() => handleTitleClick('Users')}>
                            Users
                        </li>

                        <li
                            className={`title ${activeTitle === 'Users' ? 'active  d-md-none' : 'd-md-none'}`}
                            onClick={() => handleTitleClick('Users')}
                        >
                            Users
                        </li>
                        <ul className="sub-list">
                            <li><Link className={activePage === 'Admins' ? 'active-link' : ''} to="/admins">
                                <FontAwesomeIcon icon={faUserTie} /> Admins
                            </Link></li>
                            <li><Link className={activePage === 'Editors' ? 'active-link' : ''} to="/editors">
                                <FontAwesomeIcon icon={faPen} /> Editors
                            </Link></li>
                            <li><Link className={activePage === 'Instructors' ? 'active-link' : ''} to="/instructors">
                                <FontAwesomeIcon icon={faChalkboardTeacher} /> Instructors
                            </Link></li>
                            <li><Link className={activePage === 'Students' ? 'active-link' : ''} to="/students">
                                <FontAwesomeIcon icon={faGraduationCap} /> Students {/* استخدام faGraduationCap للطلاب */}
                            </Link></li>
                            <li><Link className={activePage === 'Add User' ? 'active-link' : ''} to="/users/add">
                                <FontAwesomeIcon icon={faUserPlus} /> Add New User
                            </Link></li>
                        </ul>

                        {/* Articles Section */}
                        <li className={`title ${['Published Articles', 'Scheduled Articles', 'Articles - Saved Drafts', 'Add Article'].includes(activePage) ? 'active ' : ''} d-none d-md-block`} onClick={() => handleTitleClick('Articles')}>
                            Articles
                        </li>

                        <li
                            className={`title ${activeTitle === 'Articles' ? 'active  d-md-none' : 'd-md-none'}`}
                            onClick={() => handleTitleClick('Articles')}
                        >
                            Articles
                        </li>
                        <ul className="sub-list">
                            <li><Link className={activePage === 'Published Articles' ? 'active-link' : ''} to="/articles/published">
                                <FontAwesomeIcon icon={faNewspaper} /> Published Articles
                            </Link></li>
                            <li><Link className={activePage === 'Scheduled Articles' ? 'active-link' : ''} to="/articles/scheduled">
                                <FontAwesomeIcon icon={faCalendarAlt} /> Scheduled Articles
                            </Link></li>
                            <li><Link className={activePage === 'Articles - Saved Drafts' ? 'active-link' : ''} to="/articles/drafts">
                                <FontAwesomeIcon icon={faFileUpload} /> Saved Drafts
                            </Link></li>
                            <li><Link className={activePage === 'Add Article' ? 'active-link' : ''} to="/articles/add">
                                <FontAwesomeIcon icon={faPenNib} /> Add New Article
                            </Link></li>
                        </ul>

                        {/* Jobs Section */}
                        <li className={`title ${['Published Jobs', 'Jobs - Saved Drafts', 'Add Job'].includes(activePage) ? 'active ' : ''} d-none d-md-block`} onClick={() => handleTitleClick('Jobs')}>
                            Jobs
                        </li>

                        <li
                            className={`title ${activeTitle === 'Jobs' ? 'active  d-md-none' : 'd-md-none'}`}
                            onClick={() => handleTitleClick('Jobs')}
                        >
                            Jobs
                        </li>
                        <ul className="sub-list">
                            <li><Link className={activePage === 'Published Jobs' ? 'active-link' : ''} to="/jobs/published">
                                <FontAwesomeIcon icon={faBriefcase} /> Published Jobs
                            </Link></li>
                            <li><Link className={activePage === 'Jobs - Saved Drafts' ? 'active-link' : ''} to="/jobs/drafts">
                                <FontAwesomeIcon icon={faFileUpload} /> Saved Drafts
                            </Link></li>
                            <li><Link className={activePage === 'Add Job' ? 'active-link' : ''} to="/jobs/add">
                                <FontAwesomeIcon icon={faFileContract} /> Add New Job {/* أيقونة تعبيرية لإضافة وظيفة جديدة */}
                            </Link></li>
                        </ul>

                        {/* Courses Section */}
                        <li className={`title ${['Published Courses', 'Scheduled Courses', 'Courses - Saved Drafts', 'Add Course', 'Upload Certificate'].includes(activePage) ? 'active ' : ''} d-none d-md-block`} onClick={() => handleTitleClick('Courses')}>
                            Courses
                        </li>

                        <li
                            className={`title ${activeTitle === 'Courses' ? 'active  d-md-none' : 'd-md-none'}`}
                            onClick={() => handleTitleClick('Courses')}
                        >
                            Courses
                        </li>
                        <ul className="sub-list">
                            <li><Link className={activePage === 'Published Courses' ? 'active-link' : ''} to="/courses/published">
                                <FontAwesomeIcon icon={faBook} /> Published Courses
                            </Link></li>
                            <li><Link className={activePage === 'Scheduled Courses' ? 'active-link' : ''} to="/courses/scheduled">
                                <FontAwesomeIcon icon={faCalendarAlt} /> Scheduled Courses
                            </Link></li>
                            <li><Link className={activePage === 'Courses - Saved Drafts' ? 'active-link' : ''} to="/courses/drafts">
                                <FontAwesomeIcon icon={faSave} /> Saved Drafts
                            </Link></li>
                            <li><Link className={activePage === 'Add Course' ? 'active-link' : ''} to="/courses/add">
                                <FontAwesomeIcon icon={faTasks} /> Add New Course {/* أيقونة تعبيرية لإضافة دورة جديدة */}
                            </Link></li>
                            <li><Link className={activePage === 'Upload Certificate' ? 'active-link' : ''} to="/courses/upload-certificate">
                                <FontAwesomeIcon icon={faFileUpload} /> Upload Certificate
                            </Link></li>
                        </ul>

                    </ul>


                </div>
            </div>

            {/* Dropdown for mobile */}
            <div className="d-block d-md-none mb-2" ref={dropdownRef}>
                <div className="dropdown">
                    <button
                        className="btn py-2  dropdown-toggle dropdowntoggleSideBar  w-100 d-flex justify-content-between align-items-center"
                        onClick={() => toggleDropdown(dropdownContent)}>
                        selected item
                        <i className={`fas fa-chevron-${dropdownStates[dropdownContent] ? 'up' : 'down'} dropdown-arrow`}></i>
                    </button>


                    {dropdownStates[dropdownContent] && (
                        <ul className="dropdown-menu show w-100-important ">
                            {dropdownContent === 'Admins' && (
                                <>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Admins' ? 'active' : ''}`}
                                        to="/admins"
                                        onClick={() => closeAllDropdowns()}>
                                        Admins
                                    </Link></li>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Editors' ? 'active' : ''}`}
                                        to="/editors"
                                        onClick={() => closeAllDropdowns()}>
                                        Editors
                                    </Link></li>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Instructors' ? 'active' : ''}`}
                                        to="/instructors"
                                        onClick={() => closeAllDropdowns()}>
                                        Instructors
                                    </Link></li>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Students' ? 'active' : ''}`}
                                        to="/students"
                                        onClick={() => closeAllDropdowns()}>
                                        Students
                                    </Link></li>
                                    {/* إضافة رابط Add New User */}
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Add User' ? 'active' : ''}`}
                                        to="/users/add"
                                        onClick={() => closeAllDropdowns()}>
                                        Add New User
                                    </Link></li>
                                </>
                            )}
                            {dropdownContent === 'Published Articles' && (
                                <>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Published Articles' ? 'active' : ''}`}
                                        to="/articles/published"
                                        onClick={() => closeAllDropdowns()}>
                                        Published Articles
                                    </Link></li>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Scheduled Articles' ? 'active' : ''}`}
                                        to="/articles/scheduled"
                                        onClick={() => closeAllDropdowns()}>
                                        Scheduled Articles
                                    </Link></li>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Saved Drafts' ? 'active' : ''}`}
                                        to="/articles/drafts"
                                        onClick={() => closeAllDropdowns()}>
                                        Saved Drafts
                                    </Link></li>
                                    {/* إضافة رابط Add New Article */}
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Add Article' ? 'active' : ''}`}
                                        to="/articles/add"
                                        onClick={() => closeAllDropdowns()}>
                                        Add New Article
                                    </Link></li>
                                </>
                            )}
                            {dropdownContent === 'Published Jobs' && (
                                <>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Published Jobs' ? 'active' : ''}`}
                                        to="/jobs/published"
                                        onClick={() => closeAllDropdowns()}>
                                        Published Jobs
                                    </Link></li>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Saved Drafts' ? 'active' : ''}`}
                                        to="/jobs/drafts"
                                        onClick={() => closeAllDropdowns()}>
                                        Saved Drafts
                                    </Link></li>
                                    {/* إضافة رابط Add New Job */}
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Add Job' ? 'active' : ''}`}
                                        to="/jobs/add"
                                        onClick={() => closeAllDropdowns()}>
                                        Add New Job
                                    </Link></li>
                                </>
                            )}
                            {dropdownContent === 'Published Courses' && (
                                <>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Published Courses' ? 'active' : ''}`}
                                        to="/courses/published"
                                        onClick={() => closeAllDropdowns()}>
                                        Published Courses
                                    </Link></li>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Scheduled Courses' ? 'active' : ''}`}
                                        to="/courses/scheduled"
                                        onClick={() => closeAllDropdowns()}>
                                        Scheduled Courses
                                    </Link></li>
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Saved Drafts' ? 'active' : ''}`}
                                        to="/courses/drafts"
                                        onClick={() => closeAllDropdowns()}>
                                        Saved Drafts
                                    </Link></li>
                                    {/* إضافة رابط Add New Course */}
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Add Course' ? 'active' : ''}`}
                                        to="/courses/add"
                                        onClick={() => closeAllDropdowns()}>
                                        Add New Course
                                    </Link></li>
                                    {/* إضافة رابط Upload Certificate */}
                                    <li><Link
                                        className={`dropdown-item ${activePage === 'Upload Certificate' ? 'active' : ''}`}
                                        to="/courses/upload-certificate"
                                        onClick={() => closeAllDropdowns()}>
                                        Upload Certificate
                                    </Link></li>
                                </>
                            )}
                        </ul>
                    )}


                </div>
            </div>

        </>
    );
};

export default Sidebar;