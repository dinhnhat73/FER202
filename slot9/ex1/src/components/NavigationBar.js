import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    // Sử dụng Navbar với màu nền sáng (light) và expand="lg" để responsive
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
        {/* Tên thương hiệu/website - có thể thay thế bằng tên dự án Movies Management */}
        <Navbar.Brand href="#home">Movie Hub</Navbar.Brand>
        
        {/* Toggle button hiển thị khi ở màn hình nhỏ */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav ml-auto để căn các mục menu về phía bên phải */}
          <Nav className="ms-auto"> 
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            {/* Mục Footer liên kết đến trang/phần Footer */}
            <Nav.Link href="#footer">Footer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;