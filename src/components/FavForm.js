import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

class ArchiveForm extends Component {

    constructor(props) {
        super(props)

        this.state = {

            user: '',
            live_channels: '',
            radio_channels: '',
            archives: '',
            vod: '',
            Archives:[],
            categoryL:[],
            radio:[],
            archi:[],
            vod:[],

        }
    }

    userchange = (event) => {
        this.setState({
            user: event.target.value
        })

    }
    livechange = (event) => {
        this.setState({
            live_channels: event.target.value
        })

    }
    radiochange = (event) => {
        this.setState({
            radio_channels: event.target.value
        })

    }
    archiveschange = (event) => {
        this.setState({
            archives: event.target.value
        })

    }
    vodchange = (event) => {
        this.setState({
            vod: event.target.value
        })

    }
    componentDidMount() {
        // '''-----Livetv----'''
        this.OwnerSelect();
       // '''----users------'''
        this.fetchArchives();
        // --------radio------
        this.fetchradio();
        // -------arch---------
        this.fetcharch();
        // ---------vod--------
        this.fetchvod();
        // this.submitHandler;
    }


    OwnerSelect() {
        const ticket = localStorage.getItem("authToken")
        let ArchivesList = [];
        axios({
            method: 'GET',
            url: API_PATH.URL + "livetv/channels/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
            },
        })
        .then(response => {
            console.log(response);
            let archives = response.data.results;
            ArchivesList = archives.map((arch) => {
                return arch
            });
            console.log(ArchivesList)
            this.setState({
                Archives: ArchivesList
            })
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }

    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        let CategoryList = [];
        axios({
            method: 'GET',
            url: API_PATH.URL + "livetv/channels/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ticket

            },
        })
            .then(response => {
                console.log(response)
                let Categories = response.data.results;
                CategoryList = Categories.map((categ) => {
                    return categ
                });
                console.log(CategoryList)
                this.setState({
                    categoryL: CategoryList
                })
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }

    fetchradio() {
        const ticket = localStorage.getItem("authToken")
        let RadioList = [];
        axios({
            method: 'GET',
            url: API_PATH.URL + "radio/channels/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ticket

            },
        })
            .then(response => {
                console.log(response)
                let radioo = response.data.results;
                RadioList = radioo.map((rad) => {
                    return rad
                });
                console.log(RadioList)
                this.setState({
                    radio: RadioList
                })
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }
    fetcharch() {
        const ticket = localStorage.getItem("authToken")
        let archiveList = [];
        axios({
            method: 'GET',
            url: API_PATH.URL + "archives/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ticket

            },
        })
            .then(response => {
                console.log(response)
                let archiv = response.data.results;
                archiveList = archiv.map((arc) => {
                    return arc
                });
                console.log(archiveList)
                this.setState({
                    archi: archiveList
                })
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }
    fetchvod() {
        const ticket = localStorage.getItem("authToken")
        let vodList = [];
        axios({
            method: 'GET',
            url: API_PATH.URL + "vods/contents",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ticket

            },
        })
            .then(response => {
                console.log(response)
                let  vods = response.data.results;
                vodList = vods.map((vodd) => {
                    return vodd
                });
                console.log(vodList)
                this.setState({
                    vod: vodList
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
            url: API_PATH.URL + "user/favourites/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ticket
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
        const { Archives,categoryL,radio,archi,user, live_channels, radio_channels, archives, vod } = this.state
       
        let optionItmes = categoryL.map((categ) =>
            <option key={categ.id} value={categ.id}>{categ.first_name}</option>
        )
          let optionItmesL = (Archives.map = ((arch) =>
            <option key={arch.id} value={arch.id}>{arch.name}</option>
        ))
        let optionItmesR = (radio.map = ((rad) =>
            <option key={rad.id} value={rad.id}>{rad.name}</option>
        ))
        let optionItmesA = (archi.map = ((arc) =>
        <option key={arc.id} value={arc.id}>{arc.name}</option>
    ))
    let optionItmesV = (vod.map = ((vodd) =>
    <option key={vodd.id} value={vodd.id}>{vodd.name}</option>
))

        return (
            <div>
                <div>
                    <form onSubmit={this.submitHandler} class="archive"  >


                        <div>
                            <h2>Add favourite</h2>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label mt-4" for="usr">User:</label>
                            <div class="col-sm-7 mt-4">
                                <select class=" myselect" name="channel" value={user} onChange={this.userchange} >
                                    {optionItmes}
                                </select>
                            </div>
                        </div>

                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" >LiveTv Channels:</label>
                            <div class="col-sm-7">
                                <select class=" myselect" name="channel" value={live_channels} onChange={this.livechange} >
                                    {optionItmesL}
                                </select>
                            </div>
                        </div>
                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" >Radio Channels:</label>
                            <div class="col-sm-7">
                                <select class=" myselect" name="channel" value={radio_channels} onChange={this.radiochange} >
                                    {optionItmesR}
                                </select>
                            </div>
                        </div>
                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" >Archives:</label>
                            <div class="col-sm-7">
                                <select class=" myselect" name="channel" value={archives} onChange={this.archiveschange} >
                                    {optionItmesA}
                                </select>
                            </div>
                        </div>
                        <div class="form-group row" >
                            <label class="col-sm-3 col-form-label" >Vod:</label>
                            <div class="col-sm-7">
                                <select class=" myselect" name="channel" value={vod} onChange={this.vodchange} >
                                    {optionItmesV}
                                </select>
                            </div>
                        </div>

                        
                        <div class="mybuttons">
                            <button className="btn btn-mysave " type="submit">Save</button>
                            <button className="btn btn-mycancel " type="submit" onClick={() => this.handleBack()}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}


export default ArchiveForm;







