import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDropdown from './useDropdown';  // Importing the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // استيراد FontAwesome
import { faNewspaper, faBriefcase, faTasks, faSave, faCalendarAlt, faBook, faUserPlus, faPenNib, faGraduationCap, faFileUpload, faPen, faFileContract, faChalkboardTeacher, faUserTie } from '@fortawesome/free-solid-svg-icons'; 

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
        <FontAwesomeIcon icon={faUserTie} className="fa" /> Admins
    </Link></li>
    <li><Link className={activePage === 'Editors' ? 'active-link' : ''} to="/editors">
        <FontAwesomeIcon icon={faPen} className="fa" /> Editors
    </Link></li>
    <li><Link className={activePage === 'Instructors' ? 'active-link' : ''} to="/instructors">
        <FontAwesomeIcon icon={faChalkboardTeacher} className="fa" /> Instructors
    </Link></li>
    <li><Link className={activePage === 'Students' ? 'active-link' : ''} to="/students">
        <FontAwesomeIcon icon={faGraduationCap} className="fa" /> Students
    </Link></li>
    <li><Link className={activePage === 'Add User' ? 'active-link' : ''} to="/users/add">
        <FontAwesomeIcon icon={faUserPlus} className="fa" /> Add New User
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
        <FontAwesomeIcon icon={faNewspaper} className="fa" /> Published Articles
    </Link></li>
    <li><Link className={activePage === 'Scheduled Articles' ? 'active-link' : ''} to="/articles/scheduled">
        <FontAwesomeIcon icon={faCalendarAlt} className="fa" /> Scheduled Articles
    </Link></li>
    <li><Link className={activePage === 'Articles - Saved Drafts' ? 'active-link' : ''} to="/articles/drafts">
        <FontAwesomeIcon icon={faFileUpload} className="fa" /> Saved Drafts
    </Link></li>
    <li><Link className={activePage === 'Add Article' ? 'active-link' : ''} to="/articles/add">
        <FontAwesomeIcon icon={faPenNib} className="fa" /> Add New Article
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
        <FontAwesomeIcon icon={faBriefcase} className="fa" /> Published Jobs
    </Link></li>
    <li><Link className={activePage === 'Jobs - Saved Drafts' ? 'active-link' : ''} to="/jobs/drafts">
        <FontAwesomeIcon icon={faFileUpload} className="fa" /> Saved Drafts
    </Link></li>
    <li><Link className={activePage === 'Add Job' ? 'active-link' : ''} to="/jobs/add">
        <FontAwesomeIcon icon={faFileContract} className="fa" /> Add New Job
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
        <FontAwesomeIcon icon={faBook} className="fa" /> Published Courses
    </Link></li>
    <li><Link className={activePage === 'Scheduled Courses' ? 'active-link' : ''} to="/courses/scheduled">
        <FontAwesomeIcon icon={faCalendarAlt} className="fa" /> Scheduled Courses
    </Link></li>
    <li><Link className={activePage === 'Courses - Saved Drafts' ? 'active-link' : ''} to="/courses/drafts">
        <FontAwesomeIcon icon={faSave} className="fa" /> Saved Drafts
    </Link></li>
    <li><Link className={activePage === 'Upload Certificate' ? 'active-link' : ''} to="/courses/upload-certificate">
        <FontAwesomeIcon icon={faFileUpload} className="fa" /> Upload Certificate
    </Link></li>
    <li><Link className={activePage === 'Add Course' ? 'active-link' : ''} to="/courses/add">
        <FontAwesomeIcon icon={faTasks} className="fa" /> Add New Course
    </Link></li>
   
</ul>

</ul>



                </div>
            </div>

          {/* Dropdown for mobile */}
{/* Dropdown for mobile */}
<div className="d-block d-md-none mb-2" ref={dropdownRef}>
    <div className="dropdown">
        <button
            className="btn py-2 dropdown-toggle dropdowntoggleSideBar w-100 d-flex justify-content-between align-items-center"
            onClick={() => toggleDropdown(dropdownContent)}>
            selected item
            <i className={`fas fa-chevron-${dropdownStates[dropdownContent] ? 'up' : 'down'} dropdown-arrow`}></i>
        </button>

        {dropdownStates[dropdownContent] && (
            <ul className="dropdown-menu show w-100-important">
                {dropdownContent === 'Admins' && (
                    <>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Admins' ? 'active' : ''} d-flex justify-content-between`}
                            to="/admins"
                            onClick={() => closeAllDropdowns()}>
                            Admins
                            <FontAwesomeIcon icon={faUserTie} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Editors' ? 'active' : ''} d-flex justify-content-between`}
                            to="/editors"
                            onClick={() => closeAllDropdowns()}>
                            Editors
                            <FontAwesomeIcon icon={faPen} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Instructors' ? 'active' : ''} d-flex justify-content-between`}
                            to="/instructors"
                            onClick={() => closeAllDropdowns()}>
                            Instructors
                            <FontAwesomeIcon icon={faChalkboardTeacher} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Students' ? 'active' : ''} d-flex justify-content-between`}
                            to="/students"
                            onClick={() => closeAllDropdowns()}>
                            Students
                            <FontAwesomeIcon icon={faGraduationCap} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Add User' ? 'active' : ''} d-flex justify-content-between`}
                            to="/users/add"
                            onClick={() => closeAllDropdowns()}>
                            Add New User
                            <FontAwesomeIcon icon={faUserPlus} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                    </>
                )}

                {dropdownContent === 'Published Articles' && (
                    <>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Published Articles' ? 'active' : ''} d-flex justify-content-between`}
                            to="/articles/published"
                            onClick={() => closeAllDropdowns()}>
                            Published Articles
                            <FontAwesomeIcon icon={faNewspaper} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Scheduled Articles' ? 'active' : ''} d-flex justify-content-between`}
                            to="/articles/scheduled"
                            onClick={() => closeAllDropdowns()}>
                            Scheduled Articles
                            <FontAwesomeIcon icon={faCalendarAlt} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Saved Drafts' ? 'active' : ''} d-flex justify-content-between`}
                            to="/articles/drafts"
                            onClick={() => closeAllDropdowns()}>
                            Saved Drafts
                            <FontAwesomeIcon icon={faFileUpload} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Add Article' ? 'active' : ''} d-flex justify-content-between`}
                            to="/articles/add"
                            onClick={() => closeAllDropdowns()}>
                            Add New Article
                            <FontAwesomeIcon icon={faPenNib} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                    </>
                )}

                {dropdownContent === 'Published Jobs' && (
                    <>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Published Jobs' ? 'active' : ''} d-flex justify-content-between`}
                            to="/jobs/published"
                            onClick={() => closeAllDropdowns()}>
                            Published Jobs
                            <FontAwesomeIcon icon={faBriefcase} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Saved Drafts' ? 'active' : ''} d-flex justify-content-between`}
                            to="/jobs/drafts"
                            onClick={() => closeAllDropdowns()}>
                            Saved Drafts
                            <FontAwesomeIcon icon={faFileUpload} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Add Job' ? 'active' : ''} d-flex justify-content-between`}
                            to="/jobs/add"
                            onClick={() => closeAllDropdowns()}>
                            Add New Job
                            <FontAwesomeIcon icon={faFileContract} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                    </>
                )}

                {dropdownContent === 'Published Courses' && (
                    <>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Published Courses' ? 'active' : ''} d-flex justify-content-between`}
                            to="/courses/published"
                            onClick={() => closeAllDropdowns()}>
                            Published Courses
                            <FontAwesomeIcon icon={faBook} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Scheduled Courses' ? 'active' : ''} d-flex justify-content-between`}
                            to="/courses/scheduled"
                            onClick={() => closeAllDropdowns()}>
                            Scheduled Courses
                            <FontAwesomeIcon icon={faCalendarAlt} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Saved Drafts' ? 'active' : ''} d-flex justify-content-between`}
                            to="/courses/drafts"
                            onClick={() => closeAllDropdowns()}>
                            Saved Drafts
                            <FontAwesomeIcon icon={faSave} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Add Course' ? 'active' : ''} d-flex justify-content-between`}
                            to="/courses/add"
                            onClick={() => closeAllDropdowns()}>
                            Add New Course
                            <FontAwesomeIcon icon={faTasks} className="ml-auto" /> {/* الأيقونة على اليمين */}
                        </Link></li>
                        <li><Link
                            className={`dropdown-item ${activePage === 'Upload Certificate' ? 'active' : ''} d-flex justify-content-between`}
                            to="/courses/upload-certificate"
                            onClick={() => closeAllDropdowns()}>
                            Upload Certificate
                            <FontAwesomeIcon icon={faFileUpload} className="ml-auto" /> {/* الأيقونة على اليمين */}
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