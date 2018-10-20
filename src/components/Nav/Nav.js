import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Nav.css';
import Search from '../Search/Search';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../ducks/reducer';
import axios from 'axios'

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown: false
        }
    }

    handleClick = (type) => {
        if (type==="login")
            window.location.href = 'http://localhost:4000/login'
        else if (type==="user"){
            this.setState({ dropdown: !this.state.dropdown })
        }
        else if (type==="home"){
            this.props.history.push("/")
        }
        else if (type==="logout"){
            
            axios.get('http://localhost:4000/api/logout')
            .then(result => {
                this.props.logoutUser()
            })
        } 
        else if (type==="profile"){
            this.props.history.push("/user")
        }
        else {
            console.log(this.props.user)
        }
    }

    checkIfLoggedIn = () => {
        if (!this.props.user.id) {
            axios.get(`/api/loginUser`)
            .then(result => {
                this.props.loginUser(result.data)
            }) 
            if (!this.props.user.id) {
                return (
                    <div className="NavButtContainer">
                        <button className="NavButts NavButt1" onClick={() => {this.handleClick('login')}}>LOGIN</button>
                        <button className="NavButts NavButt2" onClick={() => {this.handleClick('sign up')}}>SIGN UP</button>
                    </div>
                )
            } else {
                this.checkIfLoggedIn()
            }
        } else {
            return (
                <div className="NavProfileContainer" onClick={() => this.handleClick('user')}>
                    <h3>{this.props.user.nickname}</h3>
                    <img src={this.props.user.picture} alt="profile" />
                    {this.userMenu()}
                </div>
            )
        }
    }

    userMenu = () => {
        if (!this.state.dropdown) {
            null
        } else {
            return (
                <div className="NavDropdown" >
                    <div className="UserMenuArrow" ></div>
                    <div className="NavUserMenu" >
                        <h4 onClick={() => {this.handleClick('profile')}} >Profile</h4>
                        <div className="NavUserMenuSeperator" ></div>
                        <h4 onClick={() => {this.handleClick('logout')}} >Logout</h4>
                    </div>
                </div>
            )
        }
    }

    render () {
        if (this.props.location.pathname === '/login' || this.props.location.pathname === '/') {
            return (
                <div>
                </div>
            )
        } else { 
            return (
                <div className="NavBody">
                    <div className="NavItems">
                        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Pacifico" />
                        <p className="Navlogo" onClick={() => this.handleClick('home')}>Learn My Muse</p>
                        <Search />
                        {this.checkIfLoggedIn()}
                    </div>
                    <div className="NavBottom">
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { user } = state
    return {
        user
    }
}

export default withRouter(connect (mapStateToProps, {loginUser, logoutUser}) (Nav));




// https://jacobdayton.auth0.com/v2/logout?returnTo=http://localhost:3000/results, https://jacobdayton.auth0.com/v2/logout?returnTo=http://localhost:3000/map, https://jacobdayton.auth0.com/v2/logout?returnTo=http://localhost:3000/teacher, 