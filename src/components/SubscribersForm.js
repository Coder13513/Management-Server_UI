import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class SubscribersForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            role: 'Viewer',
            is_staff: false,

            username: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            email: '',           
            image: '',
            phone: '',
            package: '',
            parental_lock: '',
            recording_time: '',
            security_question: '1',
            security_answer:'',

            device_type:'',
            device_description:'',
            package_name:'',
            package_description:'',
            connections:'',
            mac_address:'',
            device_model:'',
            location:''




        }
    }

    FirstNamechange = (event) => {
        this.setState({
            first_name: event.target.value
        })

    }

    LastNamechange = (event) => {
        this.setState({
            last_name: event.target.value
        })

    }
    Emailchange = (event) => {
        this.setState({
            email: event.target.value

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
   

    Packagechange = (event) => {
        this.setState({
            channel_packages: event.target.value

        })
    }
    ParentalLockchange = (event) => {
        this.setState({
            parental_lock: event.target.value

        })
    }
    PVRTimechange = (event) => {
        this.setState({
            recording_time: event.target.value

        })
    }
    Phonechange = (event) => {
        this.setState({
            phone: event.target.value
        })

    }
    Filechange = (event) => {
        this.setState({
            image: event.target.files[0]
        })

    }
    Securitychange = (event) => {
        this.setState({
            security_question: event.target.value
        })

    }
    SecurityAnswerchange = (event) => {
        this.setState({
            security_answer: event.target.value
        })

    }
    devicetypechange = (event) => {
        this.setState({
            device_type: event.target.value
        })
    }
    devicedescriptionchange = (event) => {
        this.setState({
            device_description: event.target.value
        })
    }
    packagenamechange = (event) => {
        this.setState({
           package_name: event.target.value
        })
    }
    packagedescriptionchange = (event) => {
        this.setState({
            package_description: event.target.value
        })
    }
    connectionschange = (event) => {
        this.setState({
          connections: event.target.value
        })
    }
    macchange = (event) => {
        this.setState({
            mac_address: event.target.value
        })
    }
    devicemodelchange = (event) => {
        this.setState({
            device_model: event.target.value
        })
    }
    locationchange = (event) => {
        this.setState({
           location: event.target.value
        })
    }
    


    submitHandler = (event) => {
        
        alert(event)
        event.preventDefault()

        let fd = new FormData()

        fd.append("role", this.state.role)
        fd.append("first_name", this.state.first_name)
        fd.append("last_name", this.state.last_name)
        fd.append("email", this.state.email)
        fd.append("image", this.state.image)
        fd.append("phone", this.state.phone)
        fd.append("password", this.state.password)
        fd.append("confirmed_password", this.state.confirmed_password)
        fd.append("username", this.state.username)
        fd.append("parental_lock", this.state.parental_lock)
        fd.append("recording_time", this.state.recording_time)
        fd.append("channel_packages", this.state.channel_packages)
        fd.append("security_question", this.state.security_question)
        fd.append("security_answer", this.state.security_answer)

        fd.append("device_type", this.state.device_type)
        fd.append("device_description", this.state.device_description)
        fd.append("package_name", this.state.package_name)
        fd.append("package_description", this.state.package_description)
        fd.append("connections", this.state.connections)
        fd.append("mac_address", this.state.mac_address)
        fd.append("device_model", this.state.device_model)
        fd.append("location", this.state.location)







        alert(JSON.stringify(fd));
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'POST',
            url: API_PATH.URL +"auth/register/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
            data: fd
        })
            .then(response => {
                console.log(response+JSON.stringify(this.state))

            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })

    }


    render() {
        const { first_name, last_name, email,username, password,confirmed_password , parental_lock, recording_time, phone,image, security_question,security_answer,channel_packages,device_type,device_description,package_description,package_name,connections,mac_address,device_model,location } = this.state
        return (
            <div>

                <form onSubmit={this.submitHandler} class="archive"  >
                    <div >
                    <h2>Subscriber </h2>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">Username:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={username} onChange={this.Usernamechange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Password:</label>
                        <div class="col-sm-7">
                            <input type="password"  autocomplete='false' class="form-control" value={password} onChange={this.Passwordchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">Confirm Password:</label>
                        <div class="col-sm-7">
                            <input type="password"   autocomplete='false'  class="form-control" value={confirmed_password} onChange={this.ConfirmPasswordchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">First Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control " value={first_name} onChange={this.FirstNamechange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">Last Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" value={last_name} onChange={this.LastNamechange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label " for="usr">Email:</label>
                        <div class="col-sm-7">
                            <input type="email" class="form-control " value={email} onChange={this.Emailchange} />
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
                            <input type="url" class="form-control-file border" value={image} onChange={this.Filechange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Parental Lock:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" value={parental_lock} onChange={this.ParentalLockchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Recording Time:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" value={recording_time} onChange={this.PVRTimechange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Package:</label>
                        <div class="col-sm-7">
                        <select class=" myselect" value={channel_packages} onChange={this.Packagechange} >
                                    <option value="1"   >1</option>
                                    <option value="2"   >2</option>
                                   
                                </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Security Questions:</label>
                        <div class="col-sm-7">
                        <select class=" myselect" name="channel" value={security_question} onChange={this.Securitychange} >
                                    <option value="1"   >What is your Hometown</option>
                                    <option value="2"   >Who is your childhood bestfriend</option>
                                   
                                </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Security Questions:</label>
                        <div class="col-sm-7">
                            <textarea class="form-control" value={security_answer} onChange={this.SecurityAnswerchange} />
                        </div>
                    </div>

            {/* #---------------new fileds-----------------------# */}

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">Device Type:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={device_type} onChange={this.devicetypechange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">Device Description:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={device_description} onChange={this.devicedescriptionchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">Package Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={package_name} onChange={this.packagenamechange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">Package Description:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={package_description} onChange={this.packagedescriptionchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">Connections:</label>
                        <div class="col-sm-7">
                            <input type="number" class="form-control mt-4 " value={connections} onChange={this.connectionschange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">mac address:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={mac_address} onChange={this.macchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">Device Model:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={device_model} onChange={this.devicemodelchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label  mt-4" for="usr">Location:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={location} onChange={this.locationchange} />
                        </div>
                    </div>






















                    <div class="mybuttons">
                        <button className="btn btn-mysave " type="submit">Save</button>
                         <button className="btn btn-mycancel " type="submit">Cancel</button> 
                    </div>

                </form>
            </div>




        )
    }
}

export default SubscribersForm;


