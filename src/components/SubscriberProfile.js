import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";


export class ArchiveList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Archives: [],


        }
        this.handleBack = this.handleBack.bind(this)

    }

    componentDidMount() {
        this.fetchArchives();
    }
    handleBack() {
        this.props.history.goBack()
    }

    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
        axios({
            method: 'GET',
            url: API_PATH.URL +"auth/profile/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+ticket             },
        })
            .then(response => {
                console.log(response);
                let Archives = response.data.data.profile;
               
                this.setState({
                    Archives: Archives
                })
                console.log(Archives)
            })
            .catch(error => {
                console.log('failure:' + JSON.stringify(this.state));
                console.log(error)
            })
    }


    render() {
        const { Action, Archives } = this.state
        // let length= Archives.length
        return (
            <div >
                <form class="List">

                    <h2>List of Users</h2>
                    {/* {length} */}

                    <table class="table table-borderedList">
                        <thead>
                            <th>ID</th>
                            <th>Email Id</th>
                        </thead>

                        {/* {Archives.map(Archive => ( */}
                            <tbody>
                                <tr >
                                <td>{Archives.id}</td>
                                    <td>{Archives.email}</td>



                                </tr>
                            </tbody>
                    
                    </table>
                </form>
            </div >
        )
    }
}

export default ArchiveList;

