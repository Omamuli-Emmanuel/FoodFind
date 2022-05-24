import React, { useState, useEffect } from "react";
import axios from "axios"
import Container from "react-bootstrap/Container"
import Carousel from "react-bootstrap/Carousel"
import Row from "react-bootstrap/Row"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSquarePhone} from "@fortawesome/free-solid-svg-icons"
import  Button from "react-bootstrap/Button";



const Homepage = () => {

      //use axios to fetch vendor
      useEffect(() => {
           getAdminCut()
          displayMenu()
          getCat()
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

    //get admin percent multiplier
    const multiplier = adminCut / 100;

      //state to pull menu
    const [showMenu, setShowMenu] = useState([]);

     //set state to get categories
     const [cats, setCat] = useState([])
  
     const getCat = () => {
          axios.get('api/users/pullCategories').then(
               res => {
                  setCat(res.data)
                  console.log(res.data)
               }
           )
     }


    //get menu items from db
    const displayMenu = async() => {
        await axios.get('api/vendors/getMenu/')
        .then(response => {
            setShowMenu(response.data)
        }).catch(err => {
            // alert(err.data)
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
                                   src={require('../../../src/images/logo2.jpeg')}
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
                                   src={require('../../../src/images/foodgirl.jpg')}
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
                                        <img src={require('../../../src/images/instagram.png')} /> food.find1
                                   </div>
                                   <div>
                                        <img src={require('../../../src/images/mail.png')} /> Food.find@yahoo.com 
                                   </div>

                                   <div>
                                        <a href="https://wa.me/+447440035229">
                                             <Button className="bg-white mt-2 text-success" variant="outline-success">
                                                  <img src={require('../../../src/images/whatsapp.png')} /> Quick chat
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
                                   src={require('../../../src/images/slider.png')}
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
                                   src={require('../../../src/images/gegi.jpg')}
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
                                   src={require('../../../src/images/condi.jpg')}
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
                                        <div className="text-center rounded shadow p-3 text-muted">
                                             <p>
                                                  Sign up for a free FoodFind account.
                                             </p>
                                        </div>
                                   </div>
                                   <div className="col col-sm-4 p-2">
                                        <div className="text-center rounded shadow p-3 text-muted">
                                             <p>
                                                  Order from resturants close to you and have it delivered.
                                             </p>
                                        </div>
                                   </div>
                                   <div className="col col-sm-4 p-2">
                                        <div className="text-center rounded shadow p-3 text-muted">
                                             <p>
                                                  Enjoy locally made meals at your convinenience 
                                             </p>
                                        </div>
                                   </div>
                              </Row>

                             {/* <div className="p-2 text-muted">
                                   <h4 className="display-4">
                                        Menu
                                   </h4>
                             </div> */}

                            
                                   <Row>
                                   {
                                        showMenu.map(item => <div key={item._id} className="col col-sm-4 p-2 hover">
                                        <div className="shadow">
                                             <div>
                                             <img src={require('../../../public/uploads/menuImages/resized/'+item.logo)} style={{width : '100%'}} className="mb-1 rounded-top"/>
                                             </div>
                                             <div className="p-2">
                                                  <h6 className="m-0"><b>{item.itemName}</b></h6>
                                                  <div className="d-flex justify-content-between">
                                                       <div>
                                                            <p className="m-0">£{multiplier + parseInt(item.price)}</p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        </div>)
                                   }
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