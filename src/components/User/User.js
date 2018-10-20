import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import './User.css';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:4000/api/loginUser`)
        .then(result => {
            console.log(result)
        })
    }    

    render(props) {
        return (
            <div>
                User babababayyyyy
            </div>
        )
    }
}

export default connect (null) (User);