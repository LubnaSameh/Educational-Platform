import React, { useState } from 'react';
import { filterData, SearchComponent } from './SearchFunction'; // استيراد مكون ودالة البحث
import './css/style.css';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث

  const articles = [
    { title: "Here's the article title", category: 'Tech', status: 'Published', dateTime: 'Monday, June 5th 12:30 PM' },
    { title: "Here's the article title", category: 'Education', status: 'Published', dateTime: 'Monday, June 5th 12:30 PM' },
    { title: "Here's the article title", category: 'Business', status: 'Draft', dateTime: 'Monday, June 5th 12:30 PM' },
    { title: "Here's the article title", category: 'Tech', status: 'Draft', dateTime: 'Monday, June 5th 12:30 PM' },
    { title: "Here's the article title", category: 'Education', status: 'Draft', dateTime: 'Monday, June 5th 12:30 PM' },
    { title: "Here's the article title", category: 'Business', status: 'Draft', dateTime: 'Monday, June 5th 12:30 PM' },
  ];

  // فلترة المقالات بناءً على البحث
  const filteredArticles = filterData(articles, searchTerm, ['title', 'category', 'status', 'dateTime']);

  return (
    <div className="mb-5">
      {/* Top Div */}
      <div className="mb-md-0 d-flex justify-content-end position-relative" style={{ top: '-95px' }}>
        <div className="d-none d-lg-block">
          <button className="btn btn-gold text-uppercase">Create New Article</button>
        </div>
      </div>

      {/* top bar */}
      <div className="row align-items-center justify-content-between mb-3">
        <div className="col-md-5 text-md-start text-center">
          <div className="header-title">
            Articles
            <div className="linee mx-auto mx-md-0"></div>
          </div>
        </div>
        {/* Search Div */}
        <div className="col-md-5 mt-3 mt-md-0">
          <SearchComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search in Articles"
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-dark articles-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article, index) => (
              <React.Fragment key={index}>
                {/* Table for Mobile */}
                <tr className="d-block d-md-none px-0 w-100 col-12 mx-auto">
                  <td className="d-flex mx-auto w-100 mt-3" colSpan="5">
                    <div className="box mb-3 row w-100 mx-auto mt-2">
                      <div className="col-12 w-100 p-0 mx-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="fw-bold fs-6">Title:</h6>
                          <span
                            className={`${article.status === 'Published' ? 'bg-primary' : 'bg-grey'} ButtonsTable fs-6 fw-medium text-center py-1`}
                            style={{ width: '35%' }}
                          >
                            {article.status}
                          </span>
                        </div>
                        <p className="mt-2 mb-0 fs-5 fw-lighter">{article.title}</p>
                      </div>

                      <div className="col-5 mt-3 p-0">
                        <h6 className="fw-bold fs-6">Category:</h6>
                        <p className="fw-lighter fs-6">{article.category}</p>
                      </div>

                      <div className="col-7 mt-3 p-0 d-flex flex-column justify-content-end align-items-end">
                        <h6 className="fw-bold text-start me-4 fs-6">Date & Time:</h6>
                        <p className="text-start fs-6 fw-lighter ">
                          {`${article.dateTime.split(' ')[0]} ${article.dateTime.split(' ')[1]} ${article.dateTime.split(' ')[2]}`}<br />
                          {`${article.dateTime.split(' ')[3]} ${article.dateTime.split(' ')[4]}`}
                        </p>
                      </div>

                      <div className="text-end">
                        <button className="btn-act me-3"><i className="fas fa-edit"></i></button>
                        <button className="btn-act"><i className="fas fa-trash-alt"></i></button>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Table for Desktop */}
                <tr className="d-none d-md-table-row">
                  <td data-label="Title">{article.title}</td>
                  <td data-label="Category">{article.category}</td>
                  <td data-label="Status" className="d-none d-md-table-cell">
                    <span className={`${article.status === 'Published' ? 'bg-primary' : 'bg-grey'} ButtonsTable`}>
                      {article.status}
                    </span>
                  </td>
                  <td data-label="Date & Time">
                    <span className="date-time">
                      {`${article.dateTime.split(' ')[0]} ${article.dateTime.split(' ')[1]} ${article.dateTime.split(' ')[2]}`}<br />
                      {`${article.dateTime.split(' ')[3]} ${article.dateTime.split(' ')[4]}`}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="action-buttons">
                      <button className="me-1 btn-act"><i className="fas fa-edit"></i></button>
                      <button className="btn-act"><i className="fas fa-trash-alt"></i></button>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <a href="#" className="arrow">
          <i className="fas fa-chevron-left" style={{ color: '#BF9530' }}></i>
        </a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <span>.....</span>
        <a href="#" className="arrow">
          <i className="fas fa-chevron-right" style={{ color: '#BF9530' }}></i>
        </a>
      </div>

      {/* Button at the bottom */}
      <div className="d-block d-lg-none text-center d-md-flex justify-content-md-end">
        <button className="btn-gold w-100 mt-5">Create New Article</button>
      </div>
    </div>
  );
};

export default Articles;
