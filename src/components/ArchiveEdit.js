import React, { Component } from 'react';
import axios from 'axios'

import { Form } from 'react-bootstrap';
import { API_PATH } from "../components/Global";

export class ArchiveEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            video_url: '',
            owner: '1',
            num_of_days: '',
            channel: '',
            logo_image: '',
            categoryL: [],
            Owner: [],

            Archives: [],
            isAddArchive: false,
            editMode: '',
        }

    }

    namechange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    video_urlchange = (event) => {
        this.setState({
            video_url: event.target.value
        })
    }

    ownerchange = (event) => {
        this.setState({
            owner: event.target.value

        })
    }

    dayschange = (event) => {
        this.setState({
            num_of_days: event.target.value

        })
    }
    channelchange = (event) => {
        this.setState({
            channel: event.target.value

        })
    }

    fileSelectHandler = (event) => {
        this.setState({
            logo_image: event.target.files[0]
        })

    }

    onAdd() {
        this.setState({
            isAddArchive: !this.state.isAddArchive
        })
    }



    componentDidMount() {
        this.fetchArchives();
        this.Select();
        this.OwnerSelect();
    }

    OwnerSelect() {
        const ticket = localStorage.getItem("authToken")

        let Owner: [];

        axios({
            method: 'GET',
            url: API_PATH.URL + "auth/profile/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
            .then(response => {
                console.log(response);
                let Archives = response.data.data.profile;
                // alert(Archives)
                this.setState({
                    Owner: Archives
                })
                console.log(Owner)
                console.log(Owner.id)
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }

    Select() {
        const ticket = localStorage.getItem("authToken")
        let CategoryList = [];


        axios({
            method: 'GET',
            url: API_PATH.URL + "livetv/channels/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ticket

            },
        })
            .then(response => {

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
    // -------------------------get------------------------- 
    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'GET',
            url: API_PATH.URL + "archives/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
            .then(response => {
                console.log(response);
                let Archives = response.data.results;
                this.setState({
                    Archives: Archives
                })
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }

    // -------------------------edit  --------------------------
    editArchive = (Id) => {

        console.log(Id)
        this.setState({
            editMode: Id
        })
        let editingItem = this.state.Archives.find(Archive => { return Archive.id === Id; })

        this.setState({
            name: editingItem.name,
            channel: editingItem.channel,
            video_url: editingItem.video_url,
            owner: editingItem.owner,
            logo_image: editingItem.logo_image,
            num_of_days: editingItem.num_of_days,

        })
    }

    updateHandler = (e) => {
        const ticket = localStorage.getItem("authToken")
        console.log("event", e)
        e.preventDefault();
        let id = this.state.editMode;

        let fd = new FormData()
        fd.append("logo_image", this.state.logo_image)
        fd.append("name", this.state.name)
        fd.append("channel", this.state.channel)
        fd.append("video_url", this.state.video_url)
        fd.append("owner", this.state.owner)
        fd.append("num_of_days", this.state.num_of_days)


        axios({
            method: 'PUT',
            url: API_PATH.URL + "archives/" + id + '/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
            data: fd
        })
            .then(response => {
                console.log('succes:' + fd);
                console.log(response)
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }

    // -------------------delete-----------------------
    deleteArchive = (id) => {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'DELETE',
            url: API_PATH.URL + "archives/" + id + "/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            }
        })
            .then(response => {
                console.log(response)
                this.fetchArchives()

            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        const { Owner, name, video_url, categoryL, num_of_days, channel, owner, logo_image, selectedFile } = this.state
        let optionItmes = categoryL.map((categ) =>
            <option key={categ.id} value={categ.id}>{categ.name}</option>
        );
        const archivesItems = this.state.Archives.map(Archive => {
            return (
                <li key={Archive.id}>{Archive.name}
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td>
                                    <button className="btn btn-myedit " type="submit" onClick={() => this.editArchive(Archive.id)}  >Edit</button>
                                    <button className="btn btn-mydelete " type="submit" onClick={() => this.deleteArchive(Archive.id)}  >Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            )
        }
        );


        return (


            <div >
                <form class="List">
                    <h2>List of Archives</h2>
                </form >
                <ul class="itemsList">{archivesItems} </ul>
                {/* -------------------------------edit form----------------------------- */}

                <form onSubmit={this.updateHandler} class="edit"  >
                    <div class="col-sm-5 col-form-label mt-4">
                        <h2>Edit  Archive</h2>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label mt-4" for="usr">Name:</label>
                        <div class="col-sm-7">
                            <input type="text" name="name" class="form-control mt-4" value={name} onChange={this.namechange} />
                        </div>
                    </div>
                    <div class="form-group row" >
                        <label class="col-sm-3 col-form-label" >Channel:</label>
                        <div class="col-sm-7">
                            <select class=" myselect" name="channel" value={channel} onChange={this.channelchange} >
                                {/* <option value="1"   >1</option>
                                        <option value="2"   >2</option>
                                        <option value="3"   >3</option>
                                        <option value="4"   >4</option> */}
                                {optionItmes}
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Url:</label>
                        <div class="col-sm-7">
                            <input type="url" class="form-control" name="url" value={video_url} onChange={this.video_urlchange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="file"> Image:</label>
                        <div class="col-sm-7">
                            <input type="file" class="form-control-file border" onChange={this.fileSelectHandler} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Number of Days:</label>
                        <div class="col-sm-7">
                            <input type="number" class="form-control mytab" anme="days" value={num_of_days} onChange={this.dayschange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="sel1">Owner:</label>
                        <div class="col-sm-7">
                            <select class="myselect" name="owner" value={owner} onChange={this.ownerchange}>
                                <option value={Owner.id}>{Owner.name}</option>
                            </select>
                        </div>
                    </div>
                    <div class="mybuttons">
                        <button className="btn btn-mysave " type="submit">Save</button>
                        <button className="btn btn-mycancel " type="submit" onClick={() => this.handleBack()}>Cancel</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default ArchiveEdit;


