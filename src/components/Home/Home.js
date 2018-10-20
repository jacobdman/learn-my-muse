import React, { Component } from 'react';
import './Home.css'
import Search from '../Search/Search';

export default class Home extends Component {
    render() {
        return (
            <div className="HomeBody">
                <div className="HomeImageBackground">
                    <p className="Logo">Learn My Muse</p>
                    <div className="HomeSearchBox">
                        <Search />
                    </div>
                </div>
            </div>
        )
    }
}