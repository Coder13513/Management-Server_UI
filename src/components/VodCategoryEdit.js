import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class LivetvCategoryEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
          
            background_image: '',
          
            Archives: [],
            isAddArchive: false,
            editMode: '',

        }
    }

    Namechange = (event) => {
        this.setState({
            name: event.target.value
        })

    }


    
    imagechange = (event) => {
        this.setState({
            background_image: event.target.files[0]

        })
    }

   
    componentDidMount() {
        this.fetchArchives();
    }
    // -----------------get-----------------------

    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'GET',
            url: API_PATH.URL +"vods/categories/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
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
    // -----------------------edit--------------------
    editArchive = (Id) => {
        console.log(Id)
        this.setState({
            editMode: Id
        })
        let editingItem = this.state.Archives.find(Archive => { return Archive.id === Id; })
        this.setState({
            name: editingItem.name,
            
            background_image: editingItem.background_image,
           

        })
    }
    updateHandler = (e) => {

        console.log("event", e)
        e.preventDefault();
        let id = this.state.editMode;



        let fd = new FormData()
        fd.append("background_image", this.state.background_image)
        fd.append("name", this.state.name)
       
        const ticket = localStorage.getItem("authToken")


        axios({
            method: 'PUT',
            url: API_PATH.URL +"vods/categories/" + id + "/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
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
            url: API_PATH.URL +"vods/categories/" + id + "/",
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
        const { name, channel_image, category, channel_url, EPG_file, description, } = this.state
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
                    <h2>List of VoD Categories</h2>
                </form >
                <ul class="itemsList">{archivesItems} </ul>
                {/* -------------------------------edit form----------------------------- */}

                <form onSubmit={this.updateHandler} class="edit"  >

                <div class="col-sm-5 col-form-label mt-4 " >
                    <h2>Edit  VoD Categories</h2>
                </div>
                <div class="form-group row ">
                    <label class="col-sm-2 col-form-label mt-4 " for="usr">Name:</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control mt-4 " value={name} onChange={this.Namechange} />
                    </div>
                </div>

              
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label" for="file">Image:</label>
                    <div class="col-sm-8">
                        <input type="file" class="form-control-file border" onChange={this.imagechange} />
                    </div>
                </div>


              
                <div class="mybuttons">
                    <button className="btn btn-mysave " type="submit">Save</button>
                    <button className="btn btn-mycancel " type="submit">Cancel</button>
                </div>
                
                </form>                
            </div >
            


        )
    }
}

export default LivetvCategoryEdit;


