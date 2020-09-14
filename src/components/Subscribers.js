import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { API_PATH } from "../components/Global";

class Subscribers extends Component {
  render() {
    return (
      <div>  
      <div class="container mt-5 "> 
  
  <div class="box">
  <div class="div1" >
       <a><img   src="G.png" alt="John Doe"  width="50px" height="50px"/></a>
       <a class= "option">Groups</a>
  </div>   
  <div  class="div2">       
      <a role="button" class="btn action-btns"><i class="fa fa-edit" >Edit</i></a>   
      <a role="button" class="btn action-btns"><i class="fa fa-plus" >Add</i></a>  
      <a role="button" class="btn action-btns"><i class="fa fa-list" >List</i></a>   
  </div>
  </div>

  <div class="box">
  <div class="div1" >
       <a><img   src="Sub.jpg" alt="John Doe"  width="50px" height="50px"/></a>
       <a class= "option">Subscribers</a>
  </div>   
  <div  class="div2">
      <a role="button" class="btn action-btns"><i class="fa fa-edit" >Edit</i></a>  
      <Link to="subadd"> 
      <a role="button" class="btn action-btns"><i class="fa fa-plus" >Add</i></a> 
      </Link>
      <a role="button" class="btn action-btns"><i class="fa fa-list" >List</i></a>    
  </div>
  </div>


  
 

    

                {/* ------close container/div---- */}
              </div>
              </div>
             
            
          
        
       
    );
  }
}

export default Subscribers;
