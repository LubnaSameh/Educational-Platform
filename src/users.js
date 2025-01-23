import React, { useState } from 'react';
import { filterData, SearchComponent } from './SearchFunction';
const Users = () => {
 const [searchTerm, setSearchTerm] = useState(''); //searchTerm و setSearchTerm

  const users = [
    {
      name: "Here's the username",
      status: "Active",
      userID: "FE-2303",
      role: "Admin",
      email: "user@gmail.com",
    },
    {
      name: "Here's the username",
      status: "Active",
      userID: "BE-2302",
      role: "Editor",
      email: "usertwo@gmail.com",
    },
    {
      name: "Here's the username",
      status: "Inactive",
      userID: "BE-2302",
      role: "Instructor",
      email: "usertwo@gmail.com",
    },
    {
      name: "Here's the username",
      status: "Inactive",
      userID: "BE-2302",
      role: "Student",
      email: "usertwo@gmail.com",
    },
    {
      name: "Here's the username",
      status: "Inactive",
      userID: "BE-2302",
      role: "Instructor",
      email: "usertwo@gmail.com",
    },
  ];
  const filteredUsers = filterData(users, searchTerm, ['name', 'email','userID', 'role', 'status']);  

  return (
    <div className=" mb-5">
      {/* top button */}
      <div
        className="mb-md-0 d-flex justify-content-end position-relative"
        style={{ top: "-95px" }}
      >
        <div className="d-none d-lg-block">
          <button className=" btn-gold text-uppercase">Create New User</button>
        </div>
      </div>

      {/* top bar */}
      <div className="row align-items-center justify-content-between mb-3">
        <div className="col-md-5 text-md-start text-center">
          <div className="header-title">
            Users
            <div className="linee mx-auto mx-md-0"></div>
          </div>
        </div>
        <div className=" col-12 col-md-auto  ">
        <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search in Users" />
          

        </div>
      </div>

            {/* table */}
            <div className="table-responsive">
                <table className="table table-dark articles-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th className='px-md-1'>User ID</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <React.Fragment key={index}>
                                {/* Table for Mobile */}
                                <tr className="d-block d-md-none px-0 w-100 col-12 mx-auto">
                                    <td className='d-flex mx-auto w-100 mt-3' colSpan="5">
                                        <div className="box mb-3 row w-100 mx-auto mt-2">
                                            <div className="col-12 w-100 p-0 mx-auto">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h6 className='fw-bold fs-6'>Name:</h6>
                                                    <span className={`${user.status === 'Active' ? 'bg-primary' : 'bg-grey'} ButtonsTable fs-6 fw-medium text-center py-1`} style={{ width: '35%' }}>
                                                        {user.status}
                                                    </span>
                                                </div>
                                                <p className="mt-2 mb-0 fs-5 fw-lighter">{user.name}</p>
                                            </div>

                      <div className="col-5 mt-3 p-0">
                        <h6 className="fw-bold fs-6">User ID:</h6>
                        <p className="fw-lighter fs-6">{user.userID}</p>
                      </div>

                      <div className="col-7 mt-3 p-0 d-flex flex-column justify-content-end align-items-end">
                        <h6 className="fw-bold text-start fs-6">Role:</h6>
                        <p className="text-start fs-6 fw-lighter ">
                          {user.role}
                        </p>
                      </div>

                      <div className="col-12 mt-3 p-0">
                        <h6 className="fw-bold text-start fs-6">Email:</h6>
                        <p className="text-start fs-6 fw-lighter">
                          {user.email}
                        </p>
                      </div>

                      <div className="text-end">
                        <button className="btn-act me-3">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn-act">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Table for Desktop */}
                <tr className="d-none d-md-table-row">
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Status">
                    {" "}
                    <span
                      className={`${
                        user.status === "Active" ? "bg-primary" : "bg-grey"
                      } ButtonsTable `}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td data-label="User ID">{user.userID}</td>
                  <td data-label="Role">{user.role}</td>
                  <td data-label="Email">{user.email}</td>
                  <td className="text-end">
                    <div className="action-buttons">
                      <button className="me-1 btn-act">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-act">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <a href="#" className="arrow">
          <i className="fas fa-chevron-left" style={{ color: "#BF9530" }}></i>
        </a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <span>.....</span>
        <a href="#" className="arrow">
          <i className="fas fa-chevron-right" style={{ color: "#BF9530" }}></i>
        </a>
      </div>
      <div className="d-block d-lg-none text-center mt-5  d-md-flex justify-content-md-end ">
        <button className="btn btn-gold w-100">Create New Article</button>
      </div>

      <div className="upload-button  d-block d-md-none text-center mt-2  d-md-flex justify-content-md-end mt-md-2">
        <button className="btn-gold btngoldCertificates w-100">
          Upload Certificates
        </button>
      </div>
    </div>
  );
};

export default Users;
