import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from "react-router";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

function AdminRegister(){

    //set state for validation
    const [validated, setValidated] = useState(false);
    //registration error
    const [regError, setRegError] = useState();
   // use navigate
    let navigate = useNavigate();
    //set state for registration data
    const [regData, setRegData] = useState({
        email : "", 
        password : "", 
        password2 : ""
    });

    //handle form inpput change
    const handleChange = (event) => {
        const {name, value} = event.target;
        setRegData((regData) => ({...regData, [name] : value}));
    }

    //handle the form submission event
    const handleSubmit = async(event) => {
        event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
            event.stopPropagation();
      }
      setValidated(true);

      if (regData.password === regData.password2) {
            // console.log(regData)
          axios.post('api/users/adminRegister', regData)
          .then(function (response) {
            if(response.statusText === 'OK'){
                navigate('/admin/login')
            }else{
                setRegData({
                    email : "", 
                    password : "", 
                    password2 : "",
                })
            }
          });
      }else{
        setRegError("Passwords do not match, try again...");
        setRegData({
            email : "", 
            password : "", 
            password2 : "",
        })
      }
    };


    return(
        <div className="container-fluid p-5">
            <div className="container p-5 mt-5">
                <Row>
                    <div className="col col-3">

                    </div>
                    <div className="col col-6">
                       
                        <div className="rounded shadow">
                            <div className="bg-primary p-3 text-white text-bold">
                                <h5>Admin Account</h5>
                            </div>
                            <div className="p-3">
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                            {regError && <Alert>{regError}</Alert>}
                            <Form.Group as={Col}  controlId="validationCustom01">
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-2">
                                    <Form.Control type="email" name="email" placeholder="name@example.com" required onChange={handleChange} value={regData.email}/>
                                </FloatingLabel>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}  controlId="validationCustom02">
                                <FloatingLabel
                                controlId="floatingInput"
                                label="Password"
                                className="mb-2">
                                <Form.Control type="password" name="password" placeholder="Password" required onChange={handleChange} value={regData.password}/>
                                </FloatingLabel>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group as={Col} controlId="validationCustom03">
                                <FloatingLabel 
                                controlId="floatingInput"
                                label="Confirm password"
                                className="mb-2"
                                >
                                    <Form.Control type="password" name="password2" placeholder="Password" required onChange={handleChange} value={regData.password2}/>
                                </FloatingLabel>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit" >
                                Create Admin Account
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
    )

}

export default AdminRegister;