import React, {useState, useEffect} from "react"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import axios from "axios"
import FloatingLabel from "react-bootstrap/esm/FloatingLabel"
import Container  from "react-bootstrap/Container"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faSquarePen, faTrash, faRotate } from "@fortawesome/free-solid-svg-icons";

const BottomRow = () => {

    useEffect(() => {
        displayMenu();
        getAdminCut();
        getCat()
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //state tp push menu
    const [menu, setMenu] = useState({
        itemName : "", 
        price : "",
        category : "",
        info : "",
        logo : ""
    });

    //set state to get categories
    const [cats, setCat] = useState([])

    const getCat = () => {
        axios.get('api/users/pullCategories').then(
             res => {
                setCat(res.data)
                // console.log(res.data)
             }
         )
    }

    //state to hold admin percentage
    const [adminCut, setAdminCut] = useState(0)
    //function to get admin percentage
    const  getAdminCut = async() => {
        await axios.get('api/vendors/getAdminCut')
        .then(res => {
            const results = res.data
            results.map(result => {
                setAdminCut(result.percentage)
            })
        })
        .catch(err => {
           //  alert(err.data)
        })
    }

    //get admin percent multiplier
    const multiplier = adminCut / 100;

    //state to pull menu
    const [showMenu, setShowMenu] = useState([]);

    const {itemName, price, category, info} = menu;
    const [image, setOnChangeImage] = useState();

    //handle form inpput change
    const handleChange = (event) => {
        const {name, value} = event.target;
        setMenu((menu) => ({...menu, [name] : value}));
    }

    const handleFileChange = (e) => {
        setOnChangeImage(e.target.files[0])
    }

    //initialize formData
    const formData = new FormData();
    //append all properties of new vendor
    formData.append('itemImage', image);
    formData.append('itemName', itemName);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('info', info);
    formData.append('storeId', localStorage.getItem('storeId'))

    const config = {
        headers : {
            'Content-Type' : 'multipart/form-data',
        }
    }
    
    //handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
       await axios.post('api/vendors/uploadMenu', formData, config).
        then( function (response) {
            axios.get('api/vendors/getMenu/'+vendorId)
            .then(response => {
                setShowMenu(response.data)
            })
            handleClose();
        }).catch(err => {
            console.log(err)
        })
    }

    //get vendor id from db
    const vendorId = localStorage.getItem('storeId')
    //get menu items from db
    const displayMenu = async() => {
        await axios.get('api/vendors/getMenu/'+vendorId)
        .then(response => {
            setShowMenu(response.data)
        }).catch(err => {
            // alert(err.data)
        })
    }

     //delete vendor
     const handleDelete = (e, _id) =>{
        // e.preventDefault();
        axios.delete('/api/vendors/deleteItem/'+_id)
        .then(res => {
            axios.get('api/vendors/getMenu/'+vendorId)
            .then(response => {
            setShowMenu(response.data)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }



    return (
        <>
            <Row className="mb-2">
                   <div className="col-9">
                        <h5 style={{fontSize : "18px"}} className="mt-2"><b>Manage Menu items</b></h5>
                   </div>
                   <div className="col-3">
                        <Button variant="success" className="shadow rounded float-end" onClick={handleShow}>
                            Add New Menu Item
                        </Button>
                   </div>
            </Row>

            <Container>
                <Row>
                {
                    showMenu.map(item => <div key={item._id} className="col col-sm-3 p-3 hover">
                        <div className="shadow">
                            <div>
                            <img src={require('../../../../public/uploads/menuImages/resized/'+item.logo)} style={{width : '100%'}} className="mb-1 rounded-top"/>
                            </div>
                            <div className="p-2">
                                <h6 className="m-0"><b>{item.itemName}</b></h6>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="m-0">£{multiplier + parseInt(item.price)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <FontAwesomeIcon icon={faTrash} color="red" onClick={(e) => handleDelete(e, item._id)} className="shadow"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new menu item</Modal.Title>
                            </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleSubmit}>
                                        <small className="text-danger">* - All fields are required.</small>
                                        <Form.Control type="text" name="itemName" placeholder="Item name" className="mb-2" onChange={handleChange}/>
                                        <Form.Control type="text" name="price" placeholder="Price" className="mb-2" onChange={handleChange}/>
                                        <small>Image</small>
                                        <Form.Control type="file" name="itemImage" onChange={handleFileChange} className="mb-2"/>
                                        <small>Select Category / Hashtag</small>
                                        <Form.Select className="mb-2" name="category" onChange={(e) => {
                                             const selectValue = e.target.value;
                                             setMenu((menu) => ({...menu, category : selectValue}));
                                            } }> 
                                            <option value="" disabled selected>Select menu category</option>    
                                        {
                                            cats.map(cat => 
                                            <option value={cat.category} className='col-sm-2 p-1 '>
                                                   {cat.category}
                                            </option>)
                                        }
                                        </Form.Select>

                                        <FloatingLabel controlId="floatingTextarea" label="Additional Information" className="mb-3">
                                            <Form.Control as="textarea" placeholder="Leave a comment here" name="info" onChange={handleChange}/>
                                        </FloatingLabel>
                                        <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit" className="btn-success">
                                    Add to menu
                                </Button>
                    </Modal.Footer>
                                    </Form>
                                    
                                </Modal.Body>
                        </Modal>
        </>
    )

}

export default BottomRow;