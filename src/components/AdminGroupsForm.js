import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";

export class AdminGroupsForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            GroupName: '',           
            Permissions:'',
        }
    }

    GroupNamechange = (event) => {
        this.setState({
            GroupName: event.target.value
        })

    }

    
    Permissionschange = (event) => {
        this.setState({
            Permissions: event.target.value

        })
    }


    submithandler = (event) => {
        const config = {
            headers: { " Authorization": `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSJ9.z19hBjvs7r98zqFacwn5HDIZhiLnkwUKfnMEcSNj56c"}` }
        }

        event.preventDefault()
        console.log(this.state)
        axios.post
            (
                'http://127.0.0.1:8000/api/v1/archives/',
                config,
                this.state

            )


            .then(response => {
                console.log(response)
                this.setState({ posts: response.data })
            })
            .catch(error => {
                console.log(error)
            })

    }



    render() {
        const { GroupName,Permissions} = this.state
        return (
            <div>


                <form onSubmit={this.submithandler} class="archive"  >
                <div >
                 <h2>Admin Groups </h2></div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label mt-4" for="usr">Group Name:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control mt-4" value={GroupName} onChange={this.GroupNamechange} />
                        </div>
                    </div>
                   

                    <div class="form-group row" >
                        <label class="col-sm-3 col-form-label" for="sel1"> Permissions:</label>
                        <div class="col-sm-7">
                            <select id="sel1" class=" myselect" value={Permissions} onChange={this.UserPermissionschange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
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

export default AdminGroupsForm;


