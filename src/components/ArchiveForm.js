import React, { Component } from 'react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { API_PATH } from "../components/Global";

class ArchiveForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            video_url: '',
            owner:'1',
            Archives:[],
            num_of_days: '',
            channel: '',
            logo_image: '',
            categoryL:[],
           
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
    handleBack(){
        this.props.history.goBack()
    }

    componentDidMount() {
        this.fetchArchives();
        this.OwnerSelect();
        // this.submitHandler;
    }
    

    OwnerSelect() {
        const ticket = localStorage.getItem("authToken")
        
       

        axios({
            method: 'GET',
            url: API_PATH.URL +"auth/profile/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket            
             },
        })
        .then(response => {
            console.log(response);
            let Archives = response.data.data.profile;
            // alert(Archives)
            this.setState({
                Archives: Archives
            })
            console.log(Archives)
            console.log(Archives.id)
        })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }


    
    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        let CategoryList=[];

       
        axios({
            method: 'GET',
            url: API_PATH.URL + "livetv/channels/",
                        headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ticket
               
            },
        })
            .then(response => {
                console.log(response)
              
                let Categories = response.data.results;
                CategoryList= Categories.map((categ)=>{
                    return categ
                });
                console.log(CategoryList)
                this.setState({
                    categoryL:CategoryList
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
        fd.append("logo_image", this.state.logo_image)
        fd.append("name", this.state.name)
        fd.append("channel", this.state.channel)
        fd.append("video_url", this.state.video_url)
        fd.append("owner", this.state.owner)
        fd.append("num_of_days", this.state.num_of_days)


        axios({
            method: 'POST',
            url: API_PATH.URL + "archives/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket 
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
        const { name, video_url, ownerL,categoryL,Archives,num_of_days, channel, owner, logo_image, upload, selectedFile } = this.state
        let optionItmes = categoryL.map((categ)=>
        <option key={categ.id} value={categ.id}>{categ.name}</option>
        );
        // let optionItmesO(categ=>
        // <option key={categ.id} value={categ.id}>{categ.email}</option>
        // );
        return (
            <div>
                <div>
                    <form onSubmit={this.submitHandler} class="archive"  >
                   
               
                     
                        <div >
                            <h2>Add Archive</h2>
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
                                     {/* <option value={categ.id}   >{categ.email}</option> */}
                                    {/* <option value="2"   >2</option>
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
                                <input type="file" name="myimage"  class="form-control-file border" onChange={this.fileSelectHandler} />
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
                                <select class="myselect"  value={owner} onChange={this.ownerchange}>
                                    {/* <option value="1">1</option><option value= "1" >1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option> */}
                                {/* {optionItmesO} */}
                              <option key={Archives.id} value= '1' >{Archives.email}</option>
                                </select>
                            </div>
                        </div>
                        <div class="mybuttons">
                            <button className="btn btn-mysave " type="submit">Save</button>
                            <button className="btn btn-mycancel " type="submit"  onClick={()=>this.handleBack()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}


export default ArchiveForm;


