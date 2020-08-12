import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class VodCategoryForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

         
            name: '',
            background_image: '',

           

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

    submithandler = (event) => {
       
        event.preventDefault()

        let fd = new FormData()
        fd.append("background_image", this.state.background_image)
        fd.append("name", this.state.name)
       
        const ticket = localStorage.getItem("authToken")

        axios({
            method: 'POST',
            url: API_PATH.URL +"vods/categories/",
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
        const { name, background_image } = this.state
        return (
            <div>


                <form onSubmit={this.submithandler} class="archive"  >
                <div >
                <h2>Vod Category</h2>
</div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label mt-4" for="usr">Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4" value={name} onChange={this.Namechange} />
                        </div>
                    </div>



                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="file"> Image:</label>
                        <div class="col-sm-7">
                            <input type="file" class="form-control-file border"  onChange={this.imagechange} />
                        </div>
                    </div>

                    <div class="form-group row" >
                        <label class="col-sm-3 col-form-label" for="file">Adult:</label>
                        <div class="col-sm-7">
                            <input type="checkbox" class="mycheck" />
                        </div>
                    </div>

                    <div class="form-group row" >
                        <label class="col-sm-3 col-form-label" for="file">Published:</label>
                        <div class="col-sm-7">
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

export default VodCategoryForm;


