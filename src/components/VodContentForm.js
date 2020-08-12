import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class VodContentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            content_image: '',
            categoryL:[],
            category: '',
            content_url: '',          
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
            content_url: event.target.value

        })
    }
   

    imagechange = (event) => {
        this.setState({
            content_image: event.target.files[0]

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
            url: API_PATH.URL + "vods/categories/",
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
        fd.append("name", this.state.name)         
        fd.append("category", this.state.category)         
        fd.append("content_url", this.state.content_url)         
        fd.append("content_image", this.state.content_image)
        fd.append("description", this.state.description)
        const ticket = localStorage.getItem("authToken")

        axios({
        method: 'POST',
            url: API_PATH.URL +"vods/contents/",
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
        const { name, content_image, category,categoryL, content_url, description, } = this.state

        let optionItmes= categoryL.map((categ)=>
        <option key={categ.id} value={categ.id}>{categ.name}</option>
        );
        return (
            <div >
                
                <form onSubmit={this.submithandler} class="archive"  >
                <div >
                <h2>Vod Videos </h2>
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
                            <input type="url" class="form-control" value={content_url} onChange={this.channelurlchange} />
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
                                {/* <option value= "1" >1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option> */}
                                {optionItmes}
                            </select>
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

export default VodContentForm;
