import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table"
import axios from "axios"
import Modal from "react-bootstrap/esm/Modal"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/esm/Form"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faSquarePen, faTrash, faRotate } from "@fortawesome/free-solid-svg-icons";


const ShowVendors = () => {

    //state for vendor signup
    const [vendorData, setVendorData] = useState({
        storeOwner : "", 
        businessName : "",
        address : "",
        phone : "",
        storeType : "",
        email : "",
        password : "",
        wallet : 0
    });

//state to set vendor info
    const[infos, setVendorInfo] = useState([]);
    //controls for modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e, _id) => {
        setShow(true)

        axios.get('api/vendors/getVendor/'+_id)
        .then(res => {
            setVendorInfo(res.data)
            const results = res.data;
            results.map(result => {
                setVendorData({
                    storeOwner : result.storeOwner, 
                    businessName : result.businessName,
                    address : result.address,
                    phone : result.phone,
                    storeType : result.storeType,
                    email : result.email,
                    password : result.password,
                    wallet : result.wallet
                })
            });
        })
        .catch(err => {
            console.log(err)
        })
    }

    //call get all vendors 
    useEffect(() => {
       load();
    }, [])

    const load = () =>{
        axios.get('api/vendors/listVendors')
        .then(res => {
            setVendorInfo(res.data)

            const results = res.data;
            results.map(result => {
                setVendorData({
                    storeOwner : result.storeOwner, 
                    businessName : result.businessName,
                    address : result.address,
                    phone : result.phone,
                    storeType : result.storeType,
                    email : result.email,
                    password : result.password,
                    wallet : result.wallet
                })
            });
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    

    const {storeOwner, businessName, address, phone, storeType, email, password, wallet} = vendorData;
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
    formData.append('wallet', wallet)

    const config = {
        headers : {
            'Content-Type' : 'multipart/form-data',
        }
    }

    //update vendor
    const handleSubmit = async(e, _id) => {
        e.preventDefault();
        await axios.put('api/vendors/admin/updateVendor/'+_id, formData, config).
         then( function (response) {
             alert(response.data)
             handleClose();
         }).catch(err => {
             alert(err.data)
         })
    }

    //delete vendor
    const handleDelete = (e, _id) =>{
        e.preventDefault();
        axios.delete('/api/vendors/deleteVendor/'+_id)
        .then(res => {
            alert(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <>
             <Table hover style={{color : "gray", fontSize : "15px"}}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Business Name</th>
                        <th>Address</th>
                        <th>Wallet</th>
                        <th>Joined Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    infos.map(info => <tr key={info._id}>
                    <td className="text-center"><img className="img-fluid img-thumbnail float-start" style={{height : "100px", width : "100px"}} src={require(`../../../../public/uploads/images/${info.logo}`)} /> </td>
                    <td>{info.businessName}</td>
                    <td>{info.address}</td>
                    <td><b>£{info.wallet.toLocaleString(undefined, {maximumFractionDigits:2})}</b></td>
                    <td>{info.date}</td>
                    <td>
                        <Button variant="outline-primary" className="shadow rounded float-start" onClick={(e) => handleShow(e, info._id)}>
                        <FontAwesomeIcon icon={faSquarePen} />
                        </Button>
                        <Button variant="outline-danger" className="shadow rounded float-middle">
                        <FontAwesomeIcon icon={faTrash} onClick={(e) => handleDelete(e, info._id)}/>
                        </Button>
                        <Button variant="outline-info" className="shadow rounded float-end" onClick={load}>
                            <FontAwesomeIcon icon={faRotate} />
                        </Button>
                    </td>
                    
                    </tr>)
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new vendor</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    
                                        {
                                            infos.map(info => <Form key={info._id} onSubmit={(e) => handleSubmit(e, info._id)}> 
                                            <Form.Control type="text" name="storeOwner" value={vendorData.storeOwner} className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="text" name="businessName" value={vendorData.businessName} className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="text" name="address" value={vendorData.address} className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="text" name="phone" value={vendorData.phone} className="mb-2" onChange={handleChange}/>
                                        <Form.Select className="mb-2" name="storeType" onChange={(e) => {
                                             const selectValue = e.target.value;
                                             setVendorData((vendorData) => ({...vendorData, storeType : selectValue}));
                                        } }>
                                            <option value="">Select vendor type</option>
                                            <option value="Resturant">Resturant</option>
                                            <option value="Food Stores">Food Stores</option>
                                        </Form.Select>
                                        <small>Vendor Logo / image</small>
                                        <Form.Control type="file" name="storeImage" onChange={handleFileChange}/>
                                        <hr className="mb-1"/>
                                        <small>Login Information</small>
                                        <hr className="mt-1"/>
                                        <Form.Control type="email" name="email" value={vendorData.email} className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="password" name="password" value={vendorData.password} className="mb-2" onChange={handleChange}/>
                                        <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit">
                                    Update Vendor
                                </Button>
                    </Modal.Footer>
                                            </Form>)
                                        }
                                </Modal.Body>
                        </Modal>
        </>
    )

}

export default ShowVendors;