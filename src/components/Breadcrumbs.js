import React, { Component } from 'react'
import { Breadcrumbs as MUIBreadcrumbs, Typography, Link } from '@material-ui/core';
import {withRouter} from "react-router-dom";

import { NavLink } from "react-router-dom";

// split('/').
const Breadcrumbs = (props) => {
  console.log(props);
  const{ history,location:{pathname}}=props;
  const pathnames = pathname.split('/').filter(x => x);
  console.log(pathnames);
  return (
    <div>
      <MUIBreadcrumbs   aria-label="breadcrumb"   >
        <Link  >  <i class=" fa fa-home"></i> </Link> 
       {pathnames.map((name,index)=>{
         
                  return<Link > {name}  </Link>;
                  // return<Link onClick={()=>history.push('/')}> {name}  </Link>;
       })}
      </MUIBreadcrumbs>
    </div>
  );
}

// const Breadcrumbs = ({ route }) => (
//   <nav className="breadcrumbs">
//     {pathTo(route).map((crumb, index, breadcrumbs) => (
//       <div key={index} className="item">
//         {index < breadcrumbs.length - 1 && (
//           <NavLink to={crumb.path}>{crumb.label}</NavLink>
//         )}
//         {index === breadcrumbs.length - 1 && crumb.label}
//       </div>
//     ))}
//   </nav>
// );
export default  withRouter (Breadcrumbs);
