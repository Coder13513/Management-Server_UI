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

        }
    }

    titlechange = (event) => {
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


    submithandler = (event) => {
        event.preventDefault()

        let fd = new FormData()
        fd.append("site_logo", this.state.site_logo)
        fd.append("site_title", this.state.site_title)
      
       
        fd.append("home_page_url", this.state.home_page_url)
       
      
       
        fd.append("site_description", this.state.site_description)
       
       
       

        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'POST',
            url: API_PATH.URL +"settings/home/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
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
        const {  home_page_url,
        site_title,
        site_description ,
        site_logo, } = this.state

        return (
            <div >
                <form onSubmit={this.submithandler} class="archive"  >
                <div >
                <h2>Settings </h2>
                </div>
                    <div class="form-group row ">
                        <label class="col-sm-3 col-form-label mt-4 " for="usr">  Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4 " value={site_title} onChange={this.titlechange} />
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


