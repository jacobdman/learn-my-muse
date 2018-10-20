import React, { Component } from 'react';
import './Search.css'
import axios from 'axios';
import { updateParams, updateSearchResults } from '../../ducks/reducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Search extends Component {
    constructor () {
        super()
        this.state={
            instrument: '',
            area: '',
        }
    }

    search = (instrument, area) => {
        axios.get(`http://localhost:4000/api/search/?instrument=${instrument}`)
        .then(result => {
            this.props.updateParams( instrument, area, true, true)
            this.props.updateSearchResults(result.data)
            this.props.history.push('/results')
        })
    }

    handleChangeInstrument = (val) => {
        this.setState({ instrument: val })
    }

    handleChangeArea = (val) => {
        this.setState({ area: val })
    }

    instruments = ["Guitar", "Drums", "Bass", "Piano", "Vocals", ""]

    render() {
        return (
            <div className="SearchItems">
                <form className="SearchItems" autoComplete="on" >
                    <input className="input1" placeholder="What instrument do you want to learn?" onChange={(e) => this.handleChangeInstrument( e.target.value )} />
                    <input className="input2" placeholder="Salt Lake City, UT" onChange={(e) => this.handleChangeArea( e.target.value )} />
                    <img type="submit" src={require("../Assets/search_logo.png")} onClick={() => this.search(this.state.instrument, this.state.area)} alt="Search" />
                </form>
            </div>
        )
    }
}

export default withRouter(connect (null, {updateParams, updateSearchResults}) (Search));