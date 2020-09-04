import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class PackageForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            channel: '',
            categoryL:[],
            backgroundImage_url: '',
            thumbnailImage_url: '',
            price: '',
            validity: '',
            discount: ''

        }
    }

    Namechange = (event) => {
        this.setState({
            name: event.target.value
        })

    }

    channelchange = (event) => {
        this.setState({
            channel: event.target.value
        })

    }
    ThumbnailImageurlchange = (event) => {
        this.setState({
            thumbnailImage_url: event.target.value

        })
    }

    BackgroundImageurlchange = (event) => {
        this.setState({
            backgroundImage_url: event.target.value

        })
    }

    Pricechange = (event) => {
        this.setState({
            price: event.target.value

        })
    }
    Validitychange = (event) => {
        this.setState({
            validity: event.target.value

        })
    }
    Discountchange = (event) => {
        this.setState({
            discount: event.target.value

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
            url: API_PATH.URL + "livetv/channels/",
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
        fd.append("channel", this.state.channel)
        fd.append("name", this.state.name)
        fd.append("backgroundImage_url", this.state.backgroundImage_url)
       
        fd.append(" thumbnailImage_url", this.state. thumbnailImage_url)
       
        fd.append("price", this.state.price)
        fd.append(" discount", this.state. discount)
       
        fd.append("validity", this.state.validity)
       
       
        const ticket = localStorage.getItem("authToken")
       


        axios({
            method: 'POST',
            url: API_PATH.URL + "packages/",
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
        const { name, channel,categoryL, backgroundImage_url, thumbnailImage_url, price, validity, discount } = this.state
        let optionItmes = categoryL.map((categ)=>
        <option key={categ.id} value={categ.id}>{categ.name}</option>
        );
        return (
            <div>

                <form onSubmit={this.submithandler} class="archive"  >
                <div class="col-sm-3 col-form-label mt-4">
                <h2>Package</h2>
                </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label mt-4" for="usr">Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4" value={name} onChange={this.Namechange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="sel1">Channels:</label>
                        <div class="col-sm-7">
                            <select id="sel1" class=" myselect " value={channel} onChange={this.channelchange}>
                                {/* <option  value="1">1</option>
                                <option  value="2">2</option>
                                <option  value="3">3</option>
                                <option  value="4">4</option> */}
                                                            {optionItmes}
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Background Image url:</label>
                        <div class="col-sm-7">
                            <input type="url" class="form-control" value={backgroundImage_url} onChange={this.BackgroundImageurlchange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="file">Thumbnail Image url:</label>
                        <div class="col-sm-7">
                            <input type="url" class="form-control" value={thumbnailImage_url} onChange={this.ThumbnailImageurlchange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Price:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" value={price} onChange={this.Pricechange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Validity:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" value={validity} onChange={this.Validitychange} />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label" for="usr">Discount:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" value={discount} onChange={this.Discountchange} />
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

export default PackageForm;


