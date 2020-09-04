import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import ArchiveForm from "../components/ArchiveForm";
import ArchiveFunction from "../components/ArchiveFunction";
import LivetvFunction from "../components/LivetvFunction";
import Breadcrumbs from "../components/Breadcrumbs";
import Home from "../components/Home";
import Secondhome from "../components/Secondhome";

// Since routes are regular React components, they
// may be rendered anywhere in the app, including in
// child elements.
//
// This helps when it's time to code-split your app
// into multiple bundles because code-splitting a
// React Router app is the same as code-splitting
// any other React app.

export default function NestingExample() {
  return (
   
    <Router>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-2" >
            <div className="sidebar">
              <div className="btn-group-vertical">
                <a ><img alt="pic" src="logo_white.png" width="100%" height=" 20%" /></a>
                <div class="menu">
                  <Link to="/Archive">
                    <a type="button" className="btn text-light"><i className="fa fa-archive"></i> TV Archive</a>
                  </Link>
                  <Link to="/Livetv">
                    <a type="button" className="btn text-light"><i className="fa fa-tv"></i> Live TV</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* <Breadcrumbs/> */}

          <div class="col-sm-10" >
            <nav class="navbar navbar-expand-sm ">
              <ul class="navbar-nav">
                {/* <Breadcrumbs /> */}
              </ul>
              <ul class="navbar-nav mx-auto  ">
                <div class="maintitle">
                  <h1>IPTV</h1>
                  <p>Management Dashboard </p>
                </div>
              </ul>
              <ul class="navbar-nav ml-auto">
                <li>
                  <Link to="/logout">
                    <button className="btn btn-mylogout "><i class=" fa fa-sign-out"></i> Logout</button>
                  </Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/Archive"> <ArchiveFunction />  </Route>
              <Route path="/Livetv"> <LivetvFunction />  </Route>
            </Switch>
          </div>
        </div>
      </div>
     
  </Router> 

)
}






{/* <Switch>
            <Route path="/Home">   <Home />     </Route>
            <Route path="/secondhome"> <Secondhome />   </Route>
          </Switch> */}