import React, { Component } from 'react';
import axios from 'axios'
import { API_PATH } from "../components/Global";



export class PackageEdit extends Component {
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
            discount: '',

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
        this.select();
    }
    select() {
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

    // -------------------------get------------------------- 
    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'GET',
            url: API_PATH.URL + "packages/",
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

    // -------------------------edit  --------------------------

    editArchive = (Id) => {
        
        console.log(Id)
        this.setState({
            editMode: Id
        })
        let editingItem = this.state.Archives.find(Archive => { return Archive.id === Id; })

        this.setState({
            name: editingItem.name,
            channel: editingItem.channel,
            backgroundImage_url: editingItem.backgroundImage_url,
            thumbnailImage_url: editingItem.thumbnailImage_url,
            price: editingItem.price,
            discount: editingItem.iscount,
            validity: editingItem.validity,

        })
    }
    updateHandler = (e) => {
        const ticket = localStorage.getItem("authToken")
        console.log("event", e)
        e.preventDefault();
        let id = this.state.editMode;


        let fd = new FormData()
        fd.append("channel", this.state.channel)
        fd.append("name", this.state.name)
        fd.append("backgroundImage_url", this.state.backgroundImage_url)
        fd.append(" thumbnailImage_url", this.state.thumbnailImage_url)
        fd.append("price", this.state.price)
        fd.append(" discount", this.state.discount)
        fd.append("validity", this.state.validity)

        axios({
            method: 'PUT',
            url: API_PATH.URL + "packages/" + id,
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
            url: API_PATH.URL + "packages/" + id,
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

        const { name, channel,categoryL, backgroundImage_url, thumbnailImage_url, price, validity, discount } = this.state
        let optionItmes = categoryL.map((categ)=>
        <option key={categ.id} value={categ.id}>{categ.name}</option>
        );
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
                    <h2>List of Packages</h2>
                </form >
                <ul class="itemsList">{archivesItems} </ul>
                {/* -------------------------------edit form----------------------------- */}

                <form onSubmit={this.updateHandler} class="edit"  >
                    <div class="col-sm-5 col-form-label mt-4">
                        <h2>Edit  Package</h2>
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
                                {/* <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option> */}
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

export default PackageEdit
