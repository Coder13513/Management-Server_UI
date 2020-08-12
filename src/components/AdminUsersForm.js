import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class AdminUsersForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            role: 'Admin',  // (not on UI)
            is_staff: true,   // (not on UI)
          
            username: '',
            password: '',
            confirmed_password:"" ,
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            image: '',
                      
            
            is_superuser: '',
            UserPermissions: '',
            SuperuserPermissions: 'admin|log entry|can view log entry admin|log entry|can view log entry admin|log entry|can add log entry admin|log entry|can add log entry',          
            
            show: false,



        }
    }

    FirstNamechange = (event) => {
        this.setState({
            firstName: event.target.value
        })

    }

    LastNamechange = (event) => {
        this.setState({
            lastName: event.target.value
        })

    }
    Emailchange = (event) => {
        this.setState({
            email: event.target.value

        })
    }
    Phonechange = (event) => {
        this.setState({
            phone: event.target.value

        })
    }
    Filechange = (event) => {
        this.setState({
            image: event.target.value

        })
    }

    Usernamechange = (event) => {
        this.setState({
            username: event.target.value

        })
    }

    Passwordchange = (event) => {
        this.setState({
            password: event.target.value

        })
    }
    ConfirmPasswordchange = (event) => {
        this.setState({
            confirmed_password: event.target.value

        })
    }
   
   
    Superuserchange = (event) => {
        this.setState({
            Superuser: event.target.value

        })
    }
    UserPermissionschange = (event) => {
        this.setState({
            UserPermissions: event.target.value

        })
    }
    SuperuserPermissionschange = (event) => {
        this.setState({
            SuperuserPermissions: event.target.value

        })
    }

    toggle() {
        this.setState({
            show: !this.state.show,
        })
    }





    submitHandler = (event) => {

        event.preventDefault()

        let fd = new FormData()

        fd.append("image", this.state.image)
        fd.append("first_name", this.state.first_name)
        fd.append("last_name", this.state.last_name)
        fd.append("email", this.state.email)
        fd.append("phone", this.state.phone)
        fd.append("password", this.state.password)
        fd.append("confirmed_password", this.state.confirmed_password)
        fd.append("username", this.state.username)
        fd.append("parental_lock", this.state.parental_lock)
        fd.append("recording_time", this.state.recording_time)
        // fd.append("package", this.state.package)
        fd.append("security_question", this.state.security_question)
        fd.append("security_answer", this.state.security_answer)

        const ticket = localStorage.getItem("authToken")

        axios({
            method: 'POST',
            url: API_PATH.URL + "auth/register/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
            data: fd
        })
            .then(response => {
                console.log(response)

            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })

    }



    render() {
        const { firstName, lastName, email, username,  password, confirmed_password, phone, image, UserPermissions, SuperuserPermissions, show } = this.state

        return (

            <div>

                <form onSubmit={this.submitHandler} class="archive"  >
                    <div >
                        <h2>Admin  </h2>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label mt-4 " for="usr">Username:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control  mt-4" value={username} onChange={this.Usernamechange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">Password:</label>
                        <div class="col-sm-7">
                            <input type="password" class="form-control "autocomplete='false' value={password} onChange={this.Passwordchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">Confirm Password:</label>
                        <div class="col-sm-7">
                            <input type="password"   autocomplete='false'  class="form-control" value={confirmed_password} onChange={this.ConfirmPasswordchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">Email:</label>
                        <div class="col-sm-7">
                            <input type="email" class="form-control " value={email} onChange={this.Emailchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">First Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control " value={firstName} onChange={this.FirstNamechange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">Last Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" value={lastName} onChange={this.LastNamechange} />
                        </div>
                    </div>

                  
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">Phone:</label>
                        <div class="col-sm-7">
                            <input type="tel" class="form-control " value={phone} onChange={this.Phonechange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="file">Image :</label>
                        <div class="col-sm-7">
                            <input type="file" class="form-control-file border" value={image} onChange={this.Filechange} />
                        </div>
                    </div>
                    <div class="form-group row" >
                        <label class="col-sm-3 col-form-label" for="file">Superuser:</label>
                        <div class="col-sm-7">
                            <input type="checkbox" class="mycheck" onClick={() => this.toggle()} />
                        </div>
                    </div>
                    {
                        !show && <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" for="sel1">User Permissions:</label>
                            <div class="col-sm-7">




                                <select id="sel1" class=" myselect" value={UserPermissions} onChange={this.UserPermissionschange} >
                                    <option>admin|log entry|can add log entry</option>
                                    <option>admin|log entry|can delete log entry</option>
                                    <option>admin|log entry|can view log entry</option>
                                    <option>admin|log entry|can change log entry</option>
                                </select>
                            </div>
                        </div>
                    }
                    {show && <div class="form-group row" >
                        <label class="col-sm-3 col-form-label" for="sel1">SuperUser Permissions:</label>
                        <div class="col-sm-7">
                            <textarea class="Spermissions" value={SuperuserPermissions} onChange={this.SuperuserPermissionschange} />

                        </div>
                    </div>}


                    <div class="mybuttons">
                        <button className="btn btn-mysave " type="submit">Save</button>
                        <button className="btn btn-mycancel " type="submit">Cancel</button>
                    </div>

                </form>
            </div>
        )
    }
}









export default AdminUsersForm;


