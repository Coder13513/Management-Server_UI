import React, { Component } from 'react';
import axios from 'axios'
import AddArchiveForm from "./AddArchiveForm"
import { Form } from 'react-bootstrap'

export class ArchiveEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            video_url: '',
            owner: '1',
            num_of_days: '',
            channel: '1',
            logo_image: '',

            Archives: [],
            isAddArchive: false,
            editMode: '',
        }
        // this.handleBack=this.handleBack.bind(this)
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
    handleBack() {
        this.props.history.goBack()
    }


    componentDidMount() {
        this.fetchArchives();
    }
    // -------------------------get------------------------- 
    fetchArchives() {
        axios({
            method: 'GET',
            url: " http://175.45.180.192/api/v1/archives/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
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
            url: " http://175.45.180.192/api/v1/archives/" + id + '/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
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
        axios({
            method: 'DELETE',
            url: "http://175.45.180.192/api/v1/archives/" + id + "/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             }
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
        const { name, video_url, num_of_days, channel, owner, logo_image, selectedFile } = this.state

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
                            <div class="col-sm-3 col-form-label mt-4">
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
                                        <option value="1"   >1</option>
                                        <option value="2"   >2</option>
                                        <option value="3"   >3</option>
                                        <option value="4"   >4</option>
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
                                    <input type="file" name="myimage" class="form-control-file border" onChange={this.fileSelectHandler} />
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
                                        <option value="1">Aman</option>
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


