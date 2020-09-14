import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class LivetvChannelForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            category:'',           
            categoryL: [],
            channel_url: '',
            channel_image: '',
            EPG_file: '',
            description: '',
        

        }
    }

    Namechange = (event) => {
        this.setState({
            name: event.target.value
        })

    }


    descriptionchange = (event) => {
        this.setState({
            description: event.target.value

        })
    }
    categorychange = (event) => {
        this.setState({
            category: event.target.value

        })
    }
    channelurlchange = (event) => {
        this.setState({
            channel_url: event.target.value

        })
    }
    imagechange = (event) => {
        this.setState({
            channel_image: event.target.files[0]

        })
    }

    filechange = (event) => {
        this.setState({
            EPG_file: event.target.files[0]

        })
    }

    componentDidMount() {
        this.fetchArchives();
    }

    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        let CategoryList=[];

       
        axios({
            method: 'GET',
            url: API_PATH.URL + "livetv/categories/",
                        headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ticket
               
            },
        })
            .then(response => {
              
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


    submithandler = (event) => {
      
        event.preventDefault()

        let fd = new FormData()
        fd.append("channel_image", this.state.channel_image)
        fd.append("name", this.state.name)
        fd.append("category", this.state.category)       
        fd.append("channel_url", this.state.channel_url)       
        fd.append("EPG_file", this.state.EPG_file)       
        fd.append("description", this.state.description)
       
       
        const ticket = localStorage.getItem("authToken")


        axios({
            
            method: 'POST',
            url: API_PATH.URL + "livetv/channels/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ticket
                
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
        const { name, channel_image, categoryL,category, channel_url, EPG_file, description, } = this.state

        let optionItmes= categoryL.map((categ)=>
        <option key={categ.id} value={categ.id}>{categ.name}</option>
        );
        return (
            <div >
                
                <form onSubmit={this.submithandler} class="archive"  >
                <div >
                <h2>LivetvChannel </h2>
                </div>
                    <div class="form-group row ">
                        <label class="col-sm-2 col-form-label mt-4 " for="usr">Name:</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control mt-4 " value={name} onChange={this.Namechange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="usr">URL:</label>
                        <div class="col-sm-8">
                            <input type="url" class="form-control" value={channel_url} onChange={this.channelurlchange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="file">Image:</label>
                        <div class="col-sm-8">
                            <input type="file" class="form-control-file border"  onChange={this.imagechange} />
                        </div>
                    </div>


                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="comment">Description:</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" rows="3" value={description} onChange={this.descriptionchange} ></textarea>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="sel1">Category:</label>
                        <div class="col-sm-8">
                            <select id="sel1" class="form-control myselect" value={category} onChange={this.categorychange}>
{/*                               
                            let optionItmes= category.map((categ)=>
        <option key={categ.id}>{categ.name}</option> */}
        );  {/* <option value=>{archive.name}</option> */}
                                {/* <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option> */}
                                {optionItmes}
                            </select>
                        </div>
                    </div>



                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" for="file">EPG :</label>
                        <div class="col-sm-8">
                            <input type="file" class="form-control-file border"  onChange={this.filechange} />
                        </div>
                    </div>

                    <div class="form-group row" >
                        <label class="col-sm-2 col-form-label" for="file">Popular:</label>
                        <div class="col-sm-8">
                            <input type="checkbox" class="mycheck" />
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

export default LivetvChannelForm;


