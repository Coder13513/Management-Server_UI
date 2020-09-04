import React, { Component } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { API_PATH } from "../components/Global";

class ArchiveForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: '1',
            isGlobal: '',
            subscription: '1',
            package: '1',
            title: '',
            image_content: '',
            text_content: '',
            notify_time: '',
            reoccurance: '',
            read_status: '',

            Archives: [],
            categoryL: [],

        }



    }


    userschange = (event) => {
        this.setState({
            users: event.target.value
        })
    }

    globalchange = (event) => {
        this.setState({
            isGlobal: event.target.value
        })
    }

    subscriptionchange = (event) => {
        this.setState({
            subscription: event.target.value
        })
    }

    packagechange = (event) => {
        this.setState({
            package: event.target.value
        })
    }

    titlechange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    imagechange = (event) => {
        this.setState({
            image_content: event.target.files[0]
        })
    }

    textchange = (event) => {
        this.setState({
            text_content: event.target.value
        })
    }

    notifychange = (event) => {
        this.setState({
            notify_time: event.target.value
        })
    }

    occchange = (event) => {
        this.setState({
            reoccurance: event.target.value
        })
    }
    statuschange = (event) => {
        this.setState({
            read_status: event.target.value
        })
    }

    handleBack() {
        this.props.history.goBack()
    }

    componentDidMount() {

        this.OwnerSelect();
        this.fetchArchives();
        // this.submitHandler;
    }


    OwnerSelect() {

        const ticket = localStorage.getItem("authToken")

        let ArchivesList = []
        axios({
            method: 'GET',
            url: API_PATH.URL + "packages/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
            .then(response => {
                console.log(response); 

                let archives = response.data.results;
                ArchivesList = archives.map((arch) => {
                    return arch
                });
                console.log(ArchivesList)
                this.setState({
                    Archives: ArchivesList
                })

            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }



    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        let CategoryList = [];


        axios({
            method: 'GET',
            url: API_PATH.URL + "auth/profile/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ticket

            },
        })
            .then(response => {
                console.log(response)

                let Categories = response.data.results;
                CategoryList = Categories.map((categ) => {
                    return categ
                });
                console.log(CategoryList)
                this.setState({
                    categoryL: CategoryList
                })
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })


    }

    submitHandler = (event) => {
        const ticket = localStorage.getItem("authToken")
        event.preventDefault()

        let fd = new FormData()
        fd.append("users", this.state.users)
        fd.append("isGlobal", this.state.isGlobal)
        fd.append("subscription", this.state.subscription)
        fd.append("package", this.state.package)
        fd.append("title", this.state.title)
        fd.append("image_content", this.state.image_content)
        fd.append("text_content", this.state.text_content)
        fd.append("notify_time", this.state.notify_time)
        fd.append("reoccurance", this.state.reoccurance)
        fd.append("read_status", this.state.read_status)




        axios({
            method: 'POST',
            url: API_PATH.URL + "notification/",
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
        const { categoryL, Archives, read_status, users, isGlobal, subscription, title, image_content, text_content, notify_time, reoccurance } = this.state
        let optionItmes = categoryL.map((categ) =>
            <option key={categ.id} value={categ.id}>{categ.email}</option>
        )
        let optionItmesP = (Archives.map = ((arch) =>
            <option key={arch.id} value={arch.id}>{arch.name}</option>
        ))
        return (
            <div>
                <div>
                    <form onSubmit={this.submitHandler} class="archive"  >


                        <div >
                            <h2>Add Notification</h2>
                        </div>

                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label mt-4" >Users:</label>
                            <div class="col-sm-7 mt-4">
                                <select class=" myselect" name="channel" value={users} onChange={this.userschange} >
                                    {optionItmes}
                                </select>
                            </div>
                        </div>


                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" for="file">is Global:</label>
                            <div class="col-sm-7">
                                <input type="checkbox" class="mycheck" />
                            </div>
                        </div>

                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" >Subscription:</label>
                            <div class="col-sm-7">
                                <select class=" myselect" name="channel" onChange={this.subscriptionchange} >
                                    <option value="1"   >1</option>
                                    <option value="2"   >2</option>
                                    <option value="3"   >3</option>
                                    <option value="4"   >4</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" >Package:</label>
                            <div class="col-sm-7">
                                <select class="myselect" onChange={this.packagechange} >
                                    {optionItmesP}
                                </select>
                            </div>
                        </div>
                        <div class="form-group row ">
                            <label class="col-sm-3 col-form-label   " for="usr">Title:</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control " value={title} onChange={this.titlechange} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label" for="file">Image Content:</label>
                            <div class="col-sm-7">
                                <input type="file" class="form-control-file border" onChange={this.imagechange} />
                            </div>
                        </div>

                        <div class="form-group row ">
                            <label class="col-sm-3 col-form-label " for="usr">Text Content:</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control " onChange={this.textchange} />
                            </div>
                        </div>
                        <div class="form-group row ">
                            <label class="col-sm-3 col-form-label" for="usr">Notify Time:</label>
                            <div class="col-sm-7">
                                <input type="datetime-local" class="form-control" value={notify_time} onChange={this.notifychange} />
                            </div>
                        </div>


                        <div class="form-group row ">
                            <label class="col-sm-3 col-form-label" for="usr">Reoccurance:</label>
                            <div class="col-sm-7">
                                <select class=" myselect" name="channel" onChange={this.subscriptionchange} >
                                    <option value="N"   >None</option>
                                    <option value="D"   >Daily</option>
                                    <option value="W"   >Weekly</option>
                                    <option value="M"   >Monthly</option>
                                    <option value="Y"   >Yearly</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" for="file">Read status:</label>
                            <div class="col-sm-7">
                                <input type="checkbox" class="mycheck" />
                            </div>
                        </div>





                        <div class="mybuttons">
                            <button className="btn btn-mysave " type="submit">Save</button>
                            <button className="btn btn-mycancel " type="submit" onClick={() => this.handleBack()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}


export default ArchiveForm;


