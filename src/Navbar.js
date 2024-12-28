import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const CustomNavbar = () => {

  return (
    <div>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" className="py-1">
        <Container className="justify-content-center justify-content-lg-end">
          <Nav>
            <Nav.Link href="#admin" className="text-white">Admin Panel</Nav.Link>
            <Nav.Link href="#profile" className="text-white px-2 px-md-5 px-lg-5">Profile</Nav.Link>
            <Nav.Link href="#logout" className="text-white">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Navbar */}
      <Navbar className='mb-5' variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/images/seff_logo_transparent.png" 
              width="100"
              height="110"
              className="d-inline-block align-top "
              alt="SEF Future logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" ms-3 ms-lg-0 w-100 justify-content-start justify-content-xl-center ">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <NavDropdown title="Tech" id="tech-dropdown">
                <NavDropdown.Item href="#action1" >Action</NavDropdown.Item>
                <NavDropdown.Item href="#action2" >Another action</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#business">Business</Nav.Link>
              <Nav.Link href="#security">Security</Nav.Link>
              <Nav.Link href="#sports">Sports</Nav.Link>
              <Nav.Link href="#medical">Medical</Nav.Link>
              <Nav.Link href="#startups">Startups</Nav.Link>
              <Nav.Link href="#apps">Apps</Nav.Link>
              <NavDropdown title="Courses" id="courses-dropdown">
                <NavDropdown.Item href="#course1" >Course 1</NavDropdown.Item>
                <NavDropdown.Item href="#course2" >Course 2</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#jobs">Jobs</Nav.Link>
              <i class="fas fa-phone d-none d-lg-block d-xl-none text-white my-auto  ms-2 btn btn-outline-light  me-lg-1 me-xl-0"></i>
            </Nav>
            <Nav>
              <Nav.Link href="#contact" className="btn btn-outline-light d-lg-none d-xl-block mt-3 mt-lg-0 px-lg-3 px-xl-3 px-xxl-4 ">
               Contact US
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
