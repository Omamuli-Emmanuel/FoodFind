import React, { useState, useEffect } from "react";
import axios from 'axios'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Badge from "react-bootstrap/Badge"
import { reverseMultiplyAndSum } from "validator/lib/util/algorithms";

function AdminDashboardBody(){


      //use axios to fetch vendor
      useEffect(() => {
        countVendors()
        adminPercent()
        getCategories()
    }, [])


     //state for admin price percentage
     const[percent, setPercent] = useState({
         "percentage" : 0
     });

     //controls for modal
     const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


      //declear empty state for the vendor data
      const [vendorCount, setVendorCount] = useState()
    
       //state for vendor signup
    const [cat, setCat] = useState({
        category : "",
        vendorType : "",
        logo : ""
    });

    //state to pull categories into
    const [pCats, setPcat] = useState([]);

    const {category, vendorType} = cat;
    const [image, setOnChangeImage] = useState();

    //get number of vendors
    const countVendors = async() => {
        await axios.get('api/vendors/countVendors').then(res => {
            setVendorCount(parseInt(res.data))
         })
      }

    //pull admin percentage
    const adminPercent = async() => {
          await axios.get('api/users/adminpercent').then(res => {
              setPercent(res.data)
          })
      }

    const { percentage } = percent;
    //initialize formData
    const formData = new FormData();
    //append all properties of new vendor
    formData.append('percentage', percentage);

    //add percent
    const  addPercent = async() => {

        const newPercent = percent.percentage + 1;
        setPercent((percent) => ({percent, percentage : newPercent}))
        await axios.put('api/users/updateAdminPercentageAdd', percent).then(res => {
            // alert(res.data)
        })
    
    }

    //subtract percent
    const  subtractPercent = async() => {
        const newPercent = percent.percentage - 1;
        if(percent.percentage == 1){
            alert("I'm afraid you cant go below one")
        }else{
            setPercent((percent) => ({percent, percentage : newPercent}))
            await axios.put('api/users/updateAdminPercentageSubtract', percent).then(res => {
                // alert(res.data)
            })
        }
      }

     //handle form inpput change
     const handleChange = (event) => {
        const {name, value} = event.target;
        setCat((cat) => ({...cat, [name] : value}));
    }

      const handleFileChange = (e) => {
        setOnChangeImage(e.target.files[0])
    }

     //initialize formData
     const catData = new FormData();
     //append all properties of new vendor
     catData.append('catImage', image);
     catData.append('category', category);
     catData.append('vendorType', vendorType);

     const config = {
         headers : {
             'Content-Type' : 'multipart/form-data',
         }
     }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post('api/users/addCategory', catData, config).then(
            res => {
                handleClose();
                getCategories();
            }
        ).catch(err => {
            if (err){
                console.log(err);
            }
        })
    }

    const getCategories = () => {
        axios.get('api/users/pullCategories').then(
            res => {
               setPcat(res.data)
            }
        )
    }

    const doDelete = (e, _id) => {
        e.preventDefault();
        axios.get('api/users/deleteCategory/'+_id)
        .then(res=> {
            getCategories();
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <>
           <Container className="p-3">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 style={{fontSize : "18px"}} className="mt-2">Dashboard</h5>
                    </div>
                    <div>
                        <Button variant="dark" onClick={handleShow}>
                            Add Category
                        </Button>
                    </div>
                </div>

                <Row>
                    <div className="col-3 p-3">
                        <div className="shadow rounded p-2">
                            <Row>
                                <div className="col-9">
                                    <h6 style={{fontSize : "15px", color : "gray"}} className="mt-1 mb-0">0</h6>
                                    <h6 style={{fontSize : "10px", color : "gray"}} className="mt-1">ORDERS</h6>
                                </div>
                                <div className="col-3">

                                </div>
                            </Row>
                        </div>
                    </div>

                    <div className="col-3 p-3">
                        <div className="shadow rounded p-2">
                            <Row>
                                <div className="col-9">
                                    <h6 style={{fontSize : "15px", color : "gray"}} className="mt-1 mb-0">2</h6>
                                    <h6 style={{fontSize : "10px", color : "gray"}} className="mt-1">USERS</h6>
                                </div>
                                <div className="col-3">

                                </div>
                            </Row>
                        </div>
                    </div>

                    <div className="col-3 p-3">
                        <div className="shadow rounded p-2">
                            <Row>
                                <div className="col-9">
                                    <h6 style={{fontSize : "15px", color : "gray"}} className="mt-1 mb-0">{vendorCount}</h6>
                                    <h6 style={{fontSize : "10px", color : "gray"}} className="mt-1">STORES</h6>
                                </div>
                                <div className="col-3">

                                </div>
                            </Row>
                        </div>
                    </div>

                    <div className="col-sm-3 p-3">
                        <div className="shadow rounded p-2 mb-3">
                            <Row>
                                <div className="col-9">
                                    <h6 style={{fontSize : "15px", color : "gray"}} className="mt-1 mb-0">$0.00</h6>
                                    <h6 style={{fontSize : "10px", color : "gray"}} className="mt-1">EARNINGS</h6>
                                </div>
                                <div className="col-3">

                                </div>
                            </Row>
                        </div>                        
                    </div>
                </Row>
                <Row>
                    <div className="col-sm-9">
                        <div>
                            <h5 style={{fontSize : "18px"}} className="mt-2">Categories</h5>
                        </div>
                        <Row>
                        {
                            pCats.map(pCat => 
                            <div key={pCat._id} className='col-sm-2 p-1'>
                                <div className="d-flex justify-content-between shadow rounded border align-item-center p-1" style={{backgroundImage: `url(${require('../../../../public/uploads/catImages/resized/'+pCat.logo)})`, opacity: '5'}}>
                                    <h5 style={{fontSize : "15px", color: "whitesmoke"}} className='mt-2'>{pCat.category}</h5>
                                    
                                    <Button size="sm" variant="danger" className="m-0 p-1"  onClick={(e) => doDelete(e, pCat._id)}>x</Button>
                                </div>
                            </div>)
                        }
                        </Row>
                    </div>
                    <div className="col-sm-3">
                        <small style={{fontSize : "15px", color : "gray"}} className="mb-2">Set admin price percentage</small>
                        <div className="shadow rounded">
                            <Form>
                                <div className="p-5">
                                    <h1 align="center" style={{fontSize : "50px", color : "gray"}} >{percent.percentage}%</h1>
                                    <input type="hidden" className="form-control" value={percent.percentage} name="percentValue" />
                                </div>
                                <ButtonGroup className="col-12">
                                    <Button onClick={addPercent} variant="dark">
                                        +
                                    </Button>
                                    <Button onClick={subtractPercent} variant="dark">
                                        -
                                    </Button>
                                </ButtonGroup>
                            </Form>
                        </div>
                    </div>
                </Row>
           </Container>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add category</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Control type="text" name="category" placeholder="Category name" className="mb-2" onChange={handleChange}/>
                                        <Form.Select className="mb-2" name="vendorType" onChange={(e) => {
                                             const selectValue = e.target.value;
                                             setCat((cat) => ({...cat, vendorType : selectValue}));
                                            } }>
                                            <option value="">Vendor type</option>
                                            <option value="Resturant">Resturant</option>
                                            <option value="Food Store">Food Store</option>
                                        </Form.Select>
                                        <small>Choose Category Image</small>
                                        <Form.Control type="file" name="catImage" onChange={handleFileChange}/>
                                        <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit">
                                    Add Category
                                </Button>
                                </Modal.Footer>
                            </Form>
                                </Modal.Body>
            </Modal>
        </>
    )

}

export default AdminDashboardBody;