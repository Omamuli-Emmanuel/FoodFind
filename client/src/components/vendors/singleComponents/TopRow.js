import React, { useState, useEffect } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import axios from "axios";


const TopRow = (props) => {

    const balance = localStorage.getItem('wallet')

    useEffect(() => {
        getAdminCut();
    }, [])

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
;



    return (
        <>
        
            <Container className="p-3">
                <h5 style={{fontSize : "18px"}} className="mt-2"><b>{localStorage.getItem("businessName")}</b></h5>
                <Row>
                    <div className="col col-sm-9">
                    <Row>
                    <div className="col-3 p-3">
                        <div className="shadow rounded p-2">
                            <Row>
                                <div className="col-9">
                                    <h6 style={{fontSize : "15px", color : "gray"}} className="mt-1 mb-0">{props.count}</h6>
                                    <h6 style={{fontSize : "10px", color : "gray"}} className="mt-1">MENU</h6>
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
                                    <h6 style={{fontSize : "10px", color : "gray"}} className="mt-1">NEW ORDERS</h6>
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
                                    <h6 style={{fontSize : "15px", color : "gray"}} className="mt-1 mb-0">0</h6>
                                    <h6 style={{fontSize : "10px", color : "gray"}} className="mt-1">FULFILED ORDERS</h6>
                                </div>
                                <div className="col-3">

                                </div>
                            </Row>
                        </div>
                    </div>

                    <div className="col-3 p-3">
                    <div className="shadow rounded p-2 mb-3">
                            <Row>
                                <div className="col-9">
                                    <h6 style={{fontSize : "15px", color : "gray"}} className="mt-1 mb-0">£{balance.toLocaleString(undefined, {maximumFractionDigits:2})}</h6>
                                    <h6 style={{fontSize : "10px", color : "gray"}} className="mt-1">STORE EARNINGS</h6>
                                </div>
                                <div className="col-3">

                                </div>
                            </Row>
                        </div>

                    </div>

                </Row>
                    </div>
                    <div className="col col-sm-3">
                    <div className="shadow rounded p-3 text-center bg-success text-white">
                                    <h6 style={{fontSize : "30px"}} className="mt-1 mb-0">{adminCut}%</h6>
                                    <h6 style={{fontSize : "10px"}} className="mt-1">FOODFIND RATE TODAY</h6>
                                </div>
                    </div>
                </Row>
           </Container>
        </>
    )
}

export default TopRow;