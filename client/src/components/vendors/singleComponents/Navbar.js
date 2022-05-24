import React from "react"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router";

const NavbarVendor = () => {
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }
    

    return (
        <>
     
           <Nav className="col-md-12 d-none d-md-block bg-success sidebar shadow">
                {/* <div className="">
                    FoodFind
                </div> */}
                <hr  style={{background : "white", height : "2px"}}/>
            <Nav.Item>
                <Nav.Link>
                    <b>Dashboard</b>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">
                    <b>New Ordes</b>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">
                    <b>Fulfiled Orders</b>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">
                    <b>Declined Orders</b>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={logout}>
                    <b>Logout</b>
                </Nav.Link>
            </Nav.Item>
            </Nav>


          
        </>
    )
    
}

export default NavbarVendor;