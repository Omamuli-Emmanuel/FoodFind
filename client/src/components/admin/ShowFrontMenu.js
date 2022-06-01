import React, { useState, useEffect } from "react";
import axios from "axios"
const ShowFrontMenu = () => {


    //use axios to fetch vendor
      useEffect(() => {
           getAdminCut()
          displayMenu()
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
    const [showMenu, setShowMenu] = useState([])

    //get menu items from db
    const displayMenu = async() => {
        await axios.get('api/vendors/getMenu/')
        .then(response => {
            setShowMenu(response.data)
        }).catch(err => {
            // alert(err.data)
        })
     }
    

    return (<>

                                    {
                                        showMenu.map(item => 
                                        
                                             <div key={item._id} className="col col-sm-4 p-2 hover">
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
                                             </div>
                                        
                                        )
                                   }

    </>)
}

export default ShowFrontMenu;