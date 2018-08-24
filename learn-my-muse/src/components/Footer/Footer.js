import React from 'react';
import { withRouter } from 'react-router';
import './Footer.css';

function Footer (props) {
    if (props.location.pathname === '/login' || props.location.pathname === '/') {
        return (
            <div>
            </div>
        )
    } else { 
        return (
            <div className="FooterBody">
                <div className="FooterTop">
                </div>
                <div className="FooterItems">
                    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Pacifico" />
                    <p className="Footerlogo">Learn My Muse</p>
                    <div className="FooterButtContainer">
                        <button className="FooterButts FooterButt1" >LOGIN</button>
                        <button className="FooterButts FooterButt2" >SIGN UP</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Footer);