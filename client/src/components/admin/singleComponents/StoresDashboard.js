import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import ShowVendors from "../singleComponents/ShowVendors"
import  axios from "axios";
import Button from "react-bootstrap/esm/Button";

function StoresDashboard(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //state for vendor signup
    const [vendorData, setVendorData] = useState({
        storeOwner : "", 
        businessName : "",
        address : "",
        phone : "",
        storeType : "",
        email : "",
        password : ""
    });

    const {storeOwner, businessName, address, phone, storeType, email, password} = vendorData;
    const [image, setOnChangeImage] = useState();

    //handle form inpput change
    const handleChange = (event) => {
        const {name, value} = event.target;
        setVendorData((vendorData) => ({...vendorData, [name] : value}));
    }

    const handleFileChange = (e) => {
        setOnChangeImage(e.target.files[0])
    }


    //initialize formData
    const formData = new FormData();
    //append all properties of new vendor
    formData.append('storeImage', image);
    formData.append('storeOwner', storeOwner);
    formData.append('businessName', businessName);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('storeType', storeType);
    formData.append('email', email);
    formData.append('password', password);

    const config = {
        headers : {
            'Content-Type' : 'multipart/form-data',
        }
    }
    
    //handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
       await axios.post('api/vendors/admin/createVendor', formData, config).
        then( function (response) {
            alert(response.data)
            handleClose();
        }).catch(err => {
            alert(err.data)
        })
    }

    

    return (
        <>
            <Container className="p-3">
                <Row>
                   <div className="col-9">
                        <h5 style={{fontSize : "18px"}} className="mt-2">Stores Management</h5>
                   </div>
                   <div className="col-3">
                        <Button variant="success" className="shadow rounded float-end" onClick={handleShow}>
                            Add New Vendor
                        </Button>
                   </div>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new vendor</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Control type="text" name="storeOwner" placeholder="Store Owner" className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="text" name="businessName" placeholder="Business Name" className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="text" name="address" placeholder="Operational Address" className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="text" name="phone" placeholder="Phone Number" className="mb-2" onChange={handleChange}/>
                                        <Form.Select className="mb-2" name="storeType" onChange={(e) => {
                                             const selectValue = e.target.value;
                                             setVendorData((vendorData) => ({...vendorData, storeType : selectValue}));
                                        } }>
                                            <option value="">Select vendor type</option>
                                            <option value="Resturant">Resturant</option>
                                            <option value="Food Store">Food Store</option>
                                        </Form.Select>
                                        <small>Vendor Logo / image</small>
                                        <Form.Control type="file" name="storeImage" onChange={handleFileChange}/>
                                        <hr className="mb-1"/>
                                        <small>Login Information</small>
                                        <hr className="mt-1"/>
                                        <Form.Control type="email" name="email" placeholder="Email" className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="password" name="password" placeholder="Vendor password" className="mb-2" onChange={handleChange}/>
                                        <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit">
                                    Add vendor
                                </Button>
                                </Modal.Footer>
                                    </Form>
                                    
                                </Modal.Body>
                        </Modal>

                <div className="shadow rounded p-3 mt-3">
                    <ShowVendors />
                </div>
           </Container>
        </>
    )
}

export default StoresDashboard;