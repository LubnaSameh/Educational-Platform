// Pagination.js

import React from 'react';

// التنقل للصفحة التالية
export const handleNextPage = (currentPage, totalPages, setCurrentPage) => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
};

// التنقل للصفحة السابقة
export const handlePrevPage = (currentPage, setCurrentPage) => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    return (
        <div className="d-flex justify-content-end mt-3">
            <div className="pagination">
                <a href="#" className="arrow" onClick={(e) => { e.preventDefault(); handlePrevPage(currentPage, setCurrentPage); }}>
                    <i className="fas fa-chevron-left" style={{ color: '#BF9530' }}></i>
                </a>
                {[...Array(totalPages)].map((_, pageIndex) => {
                    const pageNumber = pageIndex + 1;
                    return (
                        <a
                            className={`px-1 mx-1 px-md-auto mx-md-auto ${pageNumber === currentPage ? 'active' : ''}`}
                            key={pageIndex}
                            href="#"
                            onClick={(e) => { e.preventDefault(); setCurrentPage(pageNumber); }}
                            style={pageNumber === currentPage ? { color: '#BF9530', fontWeight: 'bold' } : {}}
                        >
                            {pageNumber}
                        </a>
                    );
                })}
                <a href="#" className="arrow" onClick={(e) => { e.preventDefault(); handleNextPage(currentPage, totalPages, setCurrentPage); }}>
                    <i className="fas fa-chevron-right" style={{ color: '#BF9530' }}></i>
                </a>
            </div>
        </div>
    );
};

export default Pagination;
