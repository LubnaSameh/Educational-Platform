// SearchFunctions.js
import React from 'react';
// دالة الفلترة (بحث ديناميكي)
export const filterData = (data, searchTerm, fields) => {
    const term = searchTerm?.toLowerCase() || '';
    return data.filter(item =>
        fields.some(field =>
            item[field]?.toString().toLowerCase().includes(term)
        )
    );
};

// مكون البحث
export const SearchComponent = ({ searchTerm, setSearchTerm, placeholder = "Search..." }) => {
    return (
        <div className="search-container w-100 d-flex justify-content-between px-4 py-2 mt-3 mt-md-0 align-items-center">
            <input
                type="text"
                className="search-input text-white"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ color: 'white' }}
            />
            <button className="search-btn">
                <i className="fas fa-search ms-auto text-end"></i>
            </button>
        </div>
    );
};
