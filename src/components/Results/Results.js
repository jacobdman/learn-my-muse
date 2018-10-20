import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateParams, updateSearchResults, updateReviews, loginUser, logoutUser } from '../../ducks/reducer';
import './Results.css';
import axios from 'axios';
import Ratings from '../Assets/Ratings/Ratings';
import { lessonLength, lessonPriceAvg } from '../Assets/Functions/Functions'


class Results extends Component {
    handleInstrumentChange = (val) => {
        this.searchWithNewParams(val, this.props.searchParams.inHome, this.props.searchParams.studio)
    }

    handleImgClick = (val, id, bool) => {
        if (val === 'profile') {
        this.props.history.push(`/teacher/${id}?reviews=${bool}`)
        } else if (val === 'map directions') {
            this.props.history.push(`/map/${id}`)
        } else {
            this.props.history.push('/map')
        }
    }

    handleClick = () => {
        this.props.history.push('/map')
    }

    handleIfHome = (val) => {
        if(val === 'inHome') {
            this.searchWithNewParams(this.props.searchParams.instrument, true, false)
        }
        if(val === 'studio') {
            this.searchWithNewParams(this.props.searchParams.instrument, false, true)
        }
        if(val === 'all') {
            this.searchWithNewParams(this.props.searchParams.instrument, true, true)
        }
    }

    searchWithNewParams = (instrument, inHome, studio) => {
        axios.get(`http://localhost:4000/api/searchNew/?instrument=${instrument}&studio=${studio}&inHome=${inHome}`)
        .then(result => {
            this.props.updateSearchResults(result.data)
            this.props.updateParams(instrument, this.props.searchParams.area, inHome, studio)
            this.getReviews()
        })
    }    
    componentDidMount = () => {
        this.getReviews()
    }

    getReviews = () => {
        var arr = this.props.searchResults
        const idArr = []
        for (var i=0; i <= arr.length-1; i++) {
            idArr.push(arr[i].user_id)
        }
        axios.get(`http://localhost:4000/api/getReviews/${idArr}`)
        .then(result => {
            const newArr = result.data
            const reviewObj = {}
            for (var i=0; i <= newArr.length-1; i++) {
                var id = newArr[i].teacher_id
                if (typeof reviewObj[id] === "undefined") {
                    reviewObj[newArr[i].teacher_id] = [newArr[i]]
                } else {
                    reviewObj[newArr[i].teacher_id].push(newArr[i])
                }
            }
            this.avgReviews(reviewObj, idArr)
        })
    }

    avgReviews = (obj, arr) => {
        for (var i=0; i <= arr.length-1; i++) {
            var objArr = obj[arr[i]]
            const count = objArr.length;
            const total = objArr.reduce((acc, item) => acc += item.star, 0)
            const avg = total/count
            obj[arr[i]].push(avg)
        }
        this.props.updateReviews(obj)
    }

    render() {
        return (
            <div className="ResultsBody" >
                <div className="SearchParameters" >
                    <h3>Filter By:</h3>
                    <select onChange={(e) => this.handleInstrumentChange( e.target.value )} >
                        <option value="">Instrument:</option>
                        <option value="Guitar">Guitar</option>
                        <option value="Drums">Drums</option>
                        <option value="Bass">Bass</option>
                        <option value="Vocals">Vocals</option>
                    </select>
                    <select>
                        <option value="">Max Price:</option>
                        <option value="">$25</option>
                        <option value="">$50</option>
                        <option value="">$75</option>
                        <option value="">$100</option>
                    </select>
                    <select>
                        <option value="">Max Length:</option>
                        <option value="">15 Minutes</option>
                        <option value="">30 Minutes</option>
                        <option value="">45 Minutes</option>
                        <option value="">60 Minutes</option>
                    </select>
                    <select onChange={(e) => this.handleIfHome( e.target.value )} >
                        <option value={"all"} >All Results</option>
                        <option value={'inHome'} >In Home Lessons</option>
                        <option value={'studio'} >In Studio Lessons</option>
                    </select>
                    { this.props.searchParams.studio ?                  
                        <select>
                            <option value="">Max distance:</option>
                            <option value="">10 Miles</option>
                            <option value="">15 Miles</option>
                            <option value="">25 Miles</option>
                            <option value="">50 Miles</option>
                        </select> : null
                    }
                </div>
                <div className="ViewButton">
                    <button onClick={() => this.handleClick()}>Map View</button>
                </div>
                {this.props.searchResults.map(teacher => (
                    <div key={teacher.id} className="ResultsTeacherBox" >
                        {teacher.profile_picture ? <img onClick={() => this.handleImgClick('profile', teacher.id, false)} className="GreyResultsBox" src={teacher.profile_picture} alt="To Teacher"/> : <img className="GreyResultsBox" onClick={() => this.handleImgClick('profile', teacher.id, false)} src={require("../Assets/blank_profile.png")} alt="To Teacher" /> }
                        <div className="ResultsInfo" onClick={() => this.handleImgClick('profile', teacher.id, false)}>
                            <div className="ResultsInfoItems"><h4>Name:</h4>{teacher.full_name}</div>
                            <div className="ResultsInfoItems"><h4>Lesson Length:</h4>{lessonLength(teacher.lesson_length)}</div>
                            <div className="ResultsInfoItems"><h4>Price/Length:</h4>{lessonPriceAvg(teacher.price, teacher.lesson_length)}</div>
                            <div className="ResultsInfoItems"><h4>Lesson Location:</h4>{teacher.in_home ? teacher.studio_address ? <p>In home and studio lessons</p> : <p>In home lessons</p> : <p>In studio lessons</p>}</div>
                        </div>
                        <div className="ResultReviewBox" onClick={() => this.handleImgClick('profile', teacher.id, true)}>
                            {typeof this.props.reviews[teacher.id] === 'undefined' ? null : Ratings(this.props.reviews[teacher.id][this.props.reviews[teacher.id].length-1])}
                            <p>{typeof this.props.reviews[teacher.id] === 'undefined' ? null : this.props.reviews[teacher.id].length-1} reviews</p>
                        </div>
                        <img className="GreyResultsBox" onClick={() => this.handleImgClick('map directions', teacher.id)} src={require("../Assets/map.png")} alt="To Map"/>
                    </div> 
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { searchParams, searchResults, reviews } = state
    return {
        searchParams,
        searchResults,
        reviews
    }
}

export default connect (mapStateToProps, {updateParams, updateSearchResults, updateReviews, loginUser}) (Results);