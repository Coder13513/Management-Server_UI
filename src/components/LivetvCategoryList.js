import React, { Component } from 'react'
import axios from 'axios'
import { API_PATH } from "../components/Global";


export class ArchiveList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Archives: [],
           

        }
        this.handleBack=this.handleBack.bind(this)

    }
    
    componentDidMount() {
        this.fetchArchives();
    }
    handleBack(){
        this.props.history.goBack()
    }

    fetchArchives() {
        const ticket = localStorage.getItem("authToken")
       
        axios({
            method: 'GET',
            url:API_PATH.URL + "livetv/categories/",
                        headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ticket
               
            },
        })
            .then(response => {
                console.log(response);
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


    render() {
        const { Action, Archives } = this.state
        let length= Archives.length
        return (
            <div >
                 <form class="List">
                
                    <h2>List of Livetv categories</h2>
                 {/* {length} */}

                    <table class="table table-borderedList">
                        <thead>
                            <tr>
                            <th>Name</th>
                                <th>Image</th>
                               
                            </tr>
                        </thead>

                        {Archives.map(Archive => (
                            <tbody>
                            <tr key={Archive.id}>
                            <td>{Archive.name}</td>
                                <td>{Archive.background_image}</td>
                                
                                
                            </tr>
                            </tbody>
                        ))}
                    </table>
                </form>
            </div >
        )
    }
}

export default ArchiveList;


