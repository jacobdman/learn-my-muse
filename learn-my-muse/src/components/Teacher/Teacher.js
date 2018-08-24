import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Teacher.css';
import Reviews from '../Reviews/Reviews';

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {}
        }
    }

    componentDidMount = () => {
        axios.get(`http://localhost:4000/api/getTeacher/${this.props.match.params.id}`)
        .then(result => {
            this.setState({ teacher: result.data[0] })
        })
    }

    

    render(props) {
        const teacher = this.state.teacher
        // console.log(this.state.teacher)
        return (
            <div>
                <div className="TeacherBody">
                    <div className="TeacherBodyBox">
                        <div className="TeacherBox TeacherBox1">
                            {teacher.profile_picture ? <img className="" src={teacher.profile_picture} alt="Profile"/> : <img className="" src={require("../Assets/blank_profile.png")} alt="Profile" /> }
                            <div className="TeacherSeperator">
                            </div>
                            <div className="TeacherInfoBox" >
                                <div className="TeacherInfo"><h4>Name:</h4><p>{teacher.full_name}</p></div>
                                <div className="TeacherInfo"><br /><h4>Email:</h4>{teacher.email}</div>
                                <div className="TeacherInfo"><h4>Phone Number:</h4>{teacher.phone_number}</div>
                                <div className="TeacherInfo"><h4>Lesson Location:</h4>{teacher.in_home ? <p>In Home Lessons</p> : <p>In Studio Lessons</p> }</div>
                                { teacher.in_home ? null :                 
                                    <div className="TeacherInfo">
                                        <h4>Studio Address:</h4>
                                        <p>{teacher.studio_address}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="TeacherVerticalSeperator">
                        </div>
                        <div className="TeacherBox TeacherBox2">
                        </div>
                        <div className="TeacherVerticalSeperator">
                        </div>
                        <div className="TeacherBox TeacherBox3">
                        </div>
                    </div>
                </div>
                <Reviews id={this.props.match.params.id} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { searchParams, searchResults } = state
    return {
        searchParams,
        searchResults
    }
}

export default connect (mapStateToProps) (Teacher);