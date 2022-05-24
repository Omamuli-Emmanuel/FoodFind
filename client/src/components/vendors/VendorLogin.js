import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from "react-router";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

const VendorLogin = () => {

    //set state for validation
    const [validated, setValidated] = useState(false);
    //registration error
    const [loginError, setLoginError] = useState();
    // use navigate
    let navigate = useNavigate();
    //set state for registration data
    //useState for login data
    const [loginData, setLoginData] = useState({
        email : "", 
        password : ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginData((loginData) => ({...loginData, [name] : value}));
    }

    const handleSubmit = async(e) => {
        //prevent default sudmit
        e.preventDefault();
        //check form valdity
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
          }
          setValidated(true);

          //send post request with axios
          axios.post('api/vendors/vendorLogin', loginData).then(function (response) {
             //save token to local storage to remember user
             localStorage.setItem('token', response.data.token)
             console.log(response.data)
             localStorage.setItem('storeId', response.data.result._id)
             localStorage.setItem('logo', response.data.result.logo)
             localStorage.setItem('address', response.data.result.address)
             localStorage.setItem('businessName', response.data.result.businessName)
             localStorage.setItem('storeOwner', response.data.result.storeOwner)
             localStorage.setItem('address', response.data.result.address)
             localStorage.setItem('storeType', response.data.result.storeType)
             localStorage.setItem('wallet', response.data.result.wallet)
             localStorage.setItem('phone', response.data.result.phone)
             
              if(response.data.success = false){
                  setLoginError("Invalid Email or Password, try again..")
              }else{
                navigate('/vendor/dashboard')
              }
          })

          setLoginData({
            email : "", 
            password : ""
        })
    
    }

    return (
        <>
            <div className="container-fluid p-5 bg-success" style={{height : "100%"}}>
                <div className="container p-5 mt-5 mb-5">
                    <Row>
                        <div className="col col-3">

                        </div>
                        <div className="col col-6 text-center mb-5">
                            <h4 className="text-white">Vendor Login</h4>
                            <div className="rounded shadow bg-white mb-5">
                                <div className="p-5">
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                {loginError && <Alert>{loginError}</Alert>}
                                <Form.Group as={Col}  controlId="validationCustom01">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-2">
                                        <Form.Control type="email" name="email" placeholder="name@example.com" required onChange={handleChange} value={loginData.email}/>
                                    </FloatingLabel>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}  controlId="validationCustom02">
                                    <FloatingLabel
                                    controlId="floatingInput"
                                    label="Password"
                                    className="mb-2">
                                    <Form.Control type="password" name="password" placeholder="Password" required onChange={handleChange} value={loginData.password}/>
                                    </FloatingLabel>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                
                                <Button type="submit" className="col-12 btn-success">
                                    Goto My Store
                                </Button>
                                </Form>
                                </div>
                            </div>
                        </div>
                        <div className="col col-3">

                        </div>
                    </Row>
                </div>
        </div>
        </>
    )
}

export default VendorLogin;