import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class PvrForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            channel_name: '',            
            owner:"1",
            input_url:'',
            output_url:'',
            duration:'',            
            recording_server_id:'',

            Archives: [],
            isAddArchive: false,
            editMode: '',

        }
    }

   Channelnamechange = (event) => {
        this.setState({
            channel_name: event.target.value
        })

    }

    ownerchange = (event) => {
        this.setState({
            owner: event.target.value
        })

    }

    durationchange = (event) => {
        this.setState({
            duration: event.target.value
        })

    }

    recordingchange = (event) => {
        this.setState({
            recording_server_id: event.target.value
        })

    }



    outputurlchange = (event) => {
        this.setState({
            output_url: event.target.value

        })
    }
   
   
    
    inputurlchange = (event) => {
        this.setState({
            input_url: event.target.value

        })
    }
   

    componentDidMount() {
        this.fetchArchives();
    }
     // -------------------------get------------------------- 
     fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'GET',
            url: API_PATH.URL + "pvr/",
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
          
            channel_name: editingItem.channel_name,
            input_url: editingItem.input_url,
            output_url: editingItem.outpt_url,
            owner: editingItem.owner,
            duration: editingItem.duration,
            recording_server_id: editingItem.recording_server_id,
          

        })
        
    }
    updateHandler = (e) => {
        const ticket = localStorage.getItem("authToken")
        console.log("event", e)
        e.preventDefault();
        let id = this.state.editMode;
   
        let fd = new FormData()

       
         
        fd.append("channel_name", this.state.channel_name)         
        fd.append("owner", this.state.owner)         
        fd.append("input_url", this.state.input_url)         
        fd.append("output_url", this.state.output_url)
        fd.append("duration", this.state.duration)         
        fd.append("recording_server_id", this.state.recording_server_id)
       


        axios({
            method: 'PUT',
            url: API_PATH.URL + "pvr/"+ id,
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
            url: API_PATH.URL + "pvr/"+ id,
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
        const { channel_name,          
        owner,
        input_url,
        output_url,
        duration,
        recording_server_id } = this.state
        const archivesItems = this.state.Archives.map(Archive => {
            return (

                <li key={Archive.id}>{Archive.channel_name}
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
                        <h2>List of Recordings</h2>
                        </form >
                        <ul class="itemsList">{archivesItems} </ul>
                        {/* -------------------------------edit form----------------------------- */}

                        <form onSubmit={this.updateHandler} class="edit"  >
                            <div class="col-sm-5 col-form-label mt-4">
                                <h2>Edit  Recording</h2>
                            </div>
                       
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label mt-4 " for="usr">Channel name:</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control mt-4" value={channel_name} onChange={this.Channelnamechange} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label  " for="sel1">Owner:</label>
                            <div class="col-sm-7">
                                <select id="sel1" class="myselect" value={owner} onChange={this.Ownerchange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label  " for="usr">Input url:</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" value={input_url} onChange={this.inputurlchange} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label  " for="file">Output url:</label>
                            <div class="col-sm-7">
                                <input type="file" class="form-control-file border" value={output_url} onChange={this.outputurlchange} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label  " for="usr">Duration:</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" value={duration} onChange={this.durationchange} />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label  " for="usr">Recording Server id:</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" value={recording_server_id} onChange={this.recordingchange} />
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

export default PvrForm;


