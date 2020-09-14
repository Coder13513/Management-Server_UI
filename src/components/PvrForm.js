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
            recording_server_id:''

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
   

    

    submithandler = (event) => {
       
        event.preventDefault()

        let fd = new FormData()

       
         
        fd.append("channel_name", this.state.channel_name)         
        fd.append("owner", this.state.owner)         
        fd.append("input_url", this.state.input_url)         
        fd.append("output_url", this.state.output_url)
        fd.append("duration", this.state.duration)         
        fd.append("recording_server_id", this.state.recording_server_id)
       

        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'POST',
            url: " http://127.0.0.1:8000/api/v1/pvr/",
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



    render() {
        const { channel_name,          
        owner,
        input_url,
        output_url,
        duration,
        recording_server_id } = this.state

        return (
            <div>
                <div class="form mt-4" >

                    <form onSubmit={this.submithandler} class="archive"  >
                        <div >
                            <h2>Recording</h2>

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
                                <input type="text" class="form-control" value={output_url} onChange={this.outputurlchange} />
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

            </div>


        )
    }
}

export default PvrForm;


