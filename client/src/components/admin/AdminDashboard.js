import React, { useState, useEffect } from "react";
import Body from "./singleComponents/AdminDashboardBody"
import StoresDashboard from "./singleComponents/StoresDashboard"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUsers} from "@fortawesome/free-solid-svg-icons"
import {faStore} from "@fortawesome/free-solid-svg-icons"
import {faList} from "@fortawesome/free-solid-svg-icons"
import {faBasketShopping} from "@fortawesome/free-solid-svg-icons"
import {faBook} from "@fortawesome/free-solid-svg-icons"
import {faGear} from "@fortawesome/free-solid-svg-icons"
import axios from "axios";

function AdminDashboard(){

          //use axios to fetch vendor
    useEffect(() => {
        isAuthenticated();
    }, [])

    // use navigate
    let navigate = useNavigate();
  

    //set state for switching to stores
    const [storesSwitch, setStoresSwitch] = useState({
        isClicked : false
    });
    const goBack = async(e) => {
        e.preventDefault();
        setStoresSwitch({
            isClicked : false
        })
    }
    //switch from dashboard to stores
    const switchToStores = async(e) => {
        e.preventDefault();
        setStoresSwitch({
            isClicked : true
        })
    }
    //check to see user is authenticated
    const isAuthenticated = () => {
        axios.get("api/users/authStatus", {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        }).then((response) => {
            if(response.data != "Authenticated"){
                navigate('/')
            }
        })
    }

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }
  
    return(
        <>
       
            <Navbar className="BsNavbar" collapseOnSelect expand="lg" variant="dark">
                <Container>
                <Navbar.Brand href="#home" onClick={goBack}><b>FoodFind</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>
                    <Nav>
                    {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                    <Nav.Link eventKey={2} href="" onClick = {logout}>
                        Logout
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container-fluid shadow">
             
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="main_nav">
                            <ul className="navbar-nav">
                                <li className="nav-item active"  style={{marginRight : "50px", fontSize : "15px"}} > <a className="nav-link" href="" onClick={switchToStores}><FontAwesomeIcon icon={faStore} /> Stores </a> </li>
                                <li className="nav-item dropdown"  style={{marginRight : "50px", fontSize : "15px"}}>
                                <a className="nav-link  dropdown-toggle" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faList} /> Items & Menu </a>
                                    <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#"> Submenu item 1</a></li>
                                    <li><a className="dropdown-item" href="#"> Submenu item 2 </a></li>
                                    <li><a className="dropdown-item" href="#"> Submenu item 3 </a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown"  style={{marginRight : "50px", fontSize : "15px"}}>
                                <a className="nav-link  dropdown-toggle" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faUsers} /> Users </a>
                                    <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" style={{fontSize : "15px"}}><FontAwesomeIcon icon={faUsers} /> Users</a></li>
                                    <li><a className="dropdown-item" href="#" style={{fontSize : "15px"}}><FontAwesomeIcon icon={faStore} /> Vendors </a></li>
                                    </ul>
                                </li>
                                <li className="nav-item" style={{marginRight : "50px", fontSize : "15px"}}><a className="nav-link" href="#"><FontAwesomeIcon icon={faBasketShopping} /> Orders </a></li>
                                <li className="nav-item" style={{marginRight : "50px", fontSize : "15px"}}><a className="nav-link" href="#"><FontAwesomeIcon icon={faBook} /> Transactions </a></li>
                                <li className="nav-item" style={{marginRight : "50px", fontSize : "15px"}}><a className="nav-link" href="#"><FontAwesomeIcon icon={faGear} /> Settings </a></li>
                            </ul>
                        </div> 
                        </div> 
                    </nav>
            </div>
            {(!storesSwitch.isClicked) ? <Body /> : <StoresDashboard /> }
        </>
    )

}

export default AdminDashboard;