import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateParams, updateSearchResults, updateReviews } from '../../ducks/reducer';
import './SearchFilters.css';
import axios from 'axios';

class SearchFilters extends Component {
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
        axios.get(`http://localhost:4000/api/loginUser`, {withCredentials: true, headers: {'Access-Control-Allow-Origin': 'true'}})
        .then(result => 
            console.log('user data', result)
            // this.props.history.push(`/map/${result.data.id}`)
        )  
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

export default connect (mapStateToProps, {updateParams, updateSearchResults, updateReviews}) (SearchFilters);