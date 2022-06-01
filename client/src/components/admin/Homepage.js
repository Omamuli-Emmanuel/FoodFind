import React, { useState, useEffect } from "react";
import axios from "axios"
import Container from "react-bootstrap/esm/Container"
import Carousel from "react-bootstrap/esm/Carousel"
import Row from "react-bootstrap/esm/Row"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSquarePhone} from "@fortawesome/free-solid-svg-icons"
import  Button from "react-bootstrap/esm/Button";
import ShowFrontMenu from "./ShowFrontMenu";



const Homepage = () => {

      //use axios to fetch vendor
      useEffect(() => {
          getCat()
      }, [])
     
     //set state to get categories
     const [cats, setCat] = useState([])
  
     const getCat = () => {
          axios.get('api/users/pullCategories').then(
               res => {
                  setCat(res.data)
               }
           ).catch(err => {
                console.log(err)
           })
     }

      return (
           <>

               <Container fluid className="d-flex justify-content-center p-1" style={{backgroundColor : "orange", color : "whitesmoke"}}>
                    <h6>Need help placing an order? Call : +44 7440 035229‬ </h6>
               </Container>
               <Container fluid className="d-flex justify-content-between p-1 shadow">
                    <div className="ml-5">
                              <img
                                   className="d-block"
                                   src={require('../../images/logo2.jpeg')}
                                   style={{width : '80px', height : '50px'}}
                              />
                    </div>
                    <div className="mr-5">
                         {/* <h4>Help?</h4> */}
                    </div>
               </Container>
               <Row>
                    <div className="col col-sm-3 p-2">
                         <div className="p-3">
                              
                              <img
                                   className="d-block w-100 rounded shadow"
                                   src={require('../../images/foodgirl.jpg')}
                                   alt="First slide"
                              />
                         </div>
                         <div className="container-fluid">
                              <div className="row">
                                   {
                                        cats.map(cat => 
                                        <div key={cat._id} className='col col-sm-6 p-1 '>
                                             <div className="d-flex justify-content-between shadow rounded border align-item-center p-1 btn" style={{backgroundImage: `url(${require('../../../public/uploads/catImages/resized/'+cat.logo)})`, opacity: '0.9'}}>
                                                  <h5 style={{fontSize : "1.1em", color : "white"}} className='mt-2'>{cat.category}</h5>
                                             </div>
                                        </div>)
                                   }
                              </div>
                              <div className="">
                                   <h3>Get in touch</h3>
                                   <div>
                                        <img src={require('../../images/instagram.png')} /> food.find1
                                   </div>
                                   <div>
                                        <img src={require('../../images/mail.png')} style={{height : "30px"}}/> Food.find@yahoo.com 
                                   </div>

                                   <div>
                                        <a href="https://wa.me/+447440035229">
                                             <Button className="bg-white mt-2 text-success" variant="outline-success">
                                                  <img src={require('../../images/whatsapp.png')} /> Quick chat
                                             </Button>
                                        </a>
                                   </div>
                                   
                                   <h6 align="center" className="text-muted mt-5 text-sm">&copy; FoodFind 2022</h6>
                              </div>
                         </div>
                    </div>

                    <div className="col col-sm-8 p-2">
                         <div className="p-3">

                         <Carousel fade>
                              <Carousel.Item>
                              <img
                                   className="d-block w-100 rounded shadow"
                                   src={require('../../images/slider.png')}
                                   alt="First slide"
                                   style={{height : "150px"}}
                              />
                              <Carousel.Caption>
                                   {/* <h3>First slide label</h3>
                                   <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                              </Carousel.Caption>
                              </Carousel.Item>
                              <Carousel.Item>
                              <img
                                   className="d-block w-100 rounded shadow"
                                   src={require('../../images/gegi.jpg')}
                                   alt="First slide"
                                   style={{height : "150px"}}
                              />

                              <Carousel.Caption>
                                   {/* <h3>Second slide label</h3>
                                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                              </Carousel.Caption>
                              </Carousel.Item>
                              <Carousel.Item>
                              <img
                                   className="d-block w-100 rounded shadow"
                                   src={require('../../images/condi.jpg')}
                                   alt="First slide"
                                   style={{height : "150px"}}
                              />

                              <Carousel.Caption>
                                   {/* <h3>Third slide label</h3>
                                   <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                              </Carousel.Caption>
                              </Carousel.Item>
                         </Carousel>


                              <hr/>

                              
                              <Row>
                                   <div className="col col-sm-4 p-2">
                                        <div className="text-center p-3 text-muted">
                                             <div className="d-flex justify-content-center">
                                                  <img
                                                       className="d-block"
                                                       src={require('../../images/numberOne.png')}
                                                       alt="First slide"
                                                       style={{height : "32px", width : "32px"}}
                                                  />
                                             </div>
                                             <p>
                                                  Sign up for a free FoodFind account.
                                             </p>
                                        </div>
                                   </div>
                                   <div className="col col-sm-4 p-2">
                                        <div className="text-center  p-3 text-muted">
                                        <div className="d-flex justify-content-center">
                                                  <img
                                                       className="d-block"
                                                       src={require('../../images/numberTwo.png')}
                                                       alt="First slide"
                                                       style={{height : "32px", width : "32px"}}
                                                  />
                                             </div>
                                             <p>
                                                  Order from resturants close to you and have it delivered.
                                             </p>
                                        </div>
                                   </div>
                                   <div className="col col-sm-4 p-2">
                                        <div className="text-center p-3 text-muted">
                                        <div className="d-flex justify-content-center">
                                                  <img
                                                       className="d-block"
                                                       src={require('../../images/numberThree.png')}
                                                       alt="First slide"
                                                       style={{height : "32px", width : "32px"}}
                                                  />
                                             </div>
                                             <p>
                                                  Enjoy locally made meals at your convinenience 
                                             </p>
                                        </div>
                                   </div>
                              </Row>

                                   <Row>
                                        <ShowFrontMenu />
                                   </Row>
                         </div>
                    </div>

                    <div className="col col-sm-1 p-2">
                         <div className="p-3">
                              {/* fubyrejbfyreu */}
                         </div>
                    </div>
               </Row>
           </>
      );
    }
    


export default Homepage;