import React from 'react';

// دالة الفلترة (البحث)
export const filterCourses = (courses, searchTerm) => {
    return courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.lessons.toLowerCase().includes(searchTerm.toLowerCase()) ||  // البحث بعدد الدروس
        course.level.toString().includes(searchTerm.toLowerCase()) ||  // البحث بالمستوى
        course.date.toLowerCase().includes(searchTerm.toLowerCase())   // البحث بتاريخ البدء
    );
};


// مكون البحث مع الفلترة
export const SearchComponent = ({ searchTerm, setSearchTerm }) => {
    return (
        <div>
            <div className="search-container w-100 d-flex justify-content-between px-4 py-2 mt-3 mt-md-0 align-items-center ">
                <input
                    type="text"
                    className="search-input text-white "
                    placeholder="Search In Courses "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // تحديث النص المدخل
                    style={{color: 'white'}} // التأكيد على أن اللون أبيض 
                />
                <button className="search-btn  ">
                    <i className="fas fa-search ms-auto text-end"></i>
                </button>
            </div>
        </div>

    );
};


export default SearchComponent;
