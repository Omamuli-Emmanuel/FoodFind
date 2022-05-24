import React, {useEffect} from "react";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import NavbarVendor from "./singleComponents/Navbar";
import TopRow from "./singleComponents/TopRow";
import { useNavigate } from "react-router";
import axios from "axios"
import BottomRow from "./singleComponents/BottomRow";
import { useState } from "react";

const VendorDashboard = () => {
    //for navigation
    const navigate = useNavigate();

     //use axios to fetch vendor
     useEffect(() => {
        isAuthenticated();
        pullValue();
    }, [])

    //check to see user is authenticated
    const isAuthenticated = () => {
        axios.get("api/vendors/authStatus", {
            headers : {
                "x-access-token" : localStorage.getItem("token")
            }
        }).then((response) => {
            if(response.data != "Authenticated"){
                navigate('/')
            }
        })
    }

    //display the number of items on the menu
    const [vMenu, setVMenu] = useState(0);
    const vendorId = localStorage.getItem("storeId");
    const pullValue = () => {
        axios.get("api/vendors/getMenuCount/"+vendorId).then(res => {
            setVMenu(parseInt(res.data))
        }).catch(err => {
            console.log(err);
        })
    }

  
    return (
        <>
             <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <NavbarVendor />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                        <TopRow count={vMenu}/>
                        <BottomRow />
                    </Col> 
                </Row>
            </Container>
        </>
    )

}

export default VendorDashboard;