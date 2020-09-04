import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class SettingsForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            home_page_url:'',
            site_title:'',
            site_description :'',
            site_logo:'',

            Archives: [],
            isAddArchive: false,
            editMode: '',

        }
    }

    Namechange = (event) => {
        this.setState({
            site_title: event.target.value
        })

    }


    descriptionchange = (event) => {
        this.setState({
           site_description: event.target.value

        })
    }
   
    urlchange = (event) => {
        this.setState({
            home_page_url: event.target.value

        })
    }
    imagechange = (event) => {
        this.setState({
            site_logo: event.target.files[0]

        })
    }
    componentDidMount() {
        this.fetchArchives();
    }
    // -----------------get--------------
    fetchArchives() {
        
        const ticket = localStorage.getItem("authToken")

        axios({
            method: 'GET',
            url: API_PATH.URL +"settings/home/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
            .then(response => {
                // console.log(response);
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
// --------------edit---------------
editArchive = (Id) => {
    console.log(Id)
    this.setState({
        editMode: Id
    })
    let editingItem = this.state.Archives.find(Archive => { return Archive.id === Id; })
    this.setState({
        site_description: editingItem.site_description,
        site_logo: editingItem.site_logo,
        site_title: editingItem.site_title,
        home_page_url: editingItem.home_page_url,        
       

    })
}
updateHandler = (e) => {

    console.log("event", e)
    e.preventDefault();
    let id = this.state.editMode;

        let fd = new FormData()
        fd.append("site_logo", this.state.site_logo)
        fd.append("site_title", this.state.site_title)     
       
        fd.append("home_page_url", this.state.home_page_url)      
      
       
        fd.append("site_description", this.state.site_description)    
       
       
        const ticket = localStorage.getItem("authToken")

        axios({
            method: 'PUT',
            url: API_PATH.URL +"settings/home/"+id+"/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifQ.H78cV2VJzBjofNKDXcV8J4MncCr02SGNRygG9B4Uktk'
            },
            data: fd
        })
            .then(response => {
                // console.log(response)

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
        url: API_PATH.URL +"settings/home/" + id + "/",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer'+ticket         }
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
        const {  home_page_url,
        site_title,
        site_description ,
    
        site_logo, } = this.state
       
        const archivesItems = this.state.Archives.map(Archive => {
            return (
                <li key={Archive.id}>{Archive.site_title}
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
                <h2>List of Settings</h2>
            </form >
            <ul class="itemsList">{archivesItems} </ul>
            {/* -------------------------------edit form----------------------------- */}

            <form onSubmit={this.updateHandler} class="edit"  >

            <div class="col-sm-5 col-form-label mt-4 " >
                <h2>Edit  Settiings </h2>
            </div>
                    <div class="form-group row ">
                        <label class="col-sm-3 col-form-label mt-4 " for="usr">  Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={site_title} onChange={this.Namechange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">  URL:</label>
                        <div class="col-sm-7">
                            <input type="url" class="form-control" value={home_page_url} onChange={this.urlchange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="comment">  Description:</label>
                        <div class="col-sm-7">
                            <textarea class="form-control" rows="3" value={site_description} onChange={this.descriptionchange} ></textarea>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="file">  Image:</label>
                        <div class="col-sm-7">
                            <input type="file" class="form-control-file border"  onChange={this.imagechange} />
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

export default SettingsForm;


