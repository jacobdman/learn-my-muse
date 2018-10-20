import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import './Reviews.css';
import Ratings from '../Assets/Ratings/Ratings';
import verifiedImg from '../Assets/Ratings/verified.png'
import Svg from '../Assets/svg-note'


class Reviews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            star: 0,
            rating: 5,
        }
    }

    componentDidMount = (props) => {
        axios.get(`http://localhost:4000/api/getReviewsSpecific/${this.props.id}`)
            .then(result => {
                const arr = result.data
                const reviewObj = {}
                for (var i = 0; i <= arr.length - 1; i++) {
                    var id = arr[i].teacher_id
                    if (typeof reviewObj[id] === "undefined") {
                        reviewObj[arr[i].teacher_id] = [arr[i]]
                    } else {
                        reviewObj[arr[i].teacher_id].push(arr[i])
                    }
                }
                this.setState({ reviews: reviewObj[this.props.id] })
            })
    }

    avgReviews = (obj, arr) => {
        for (var i = 0; i <= arr.length - 1; i++) {
            var objArr = obj[arr[i]]
            var count = 0
            var total = 0
            var avg = 0
            for (var x = 0; x <= objArr.length - 1; x++) {
                count++
                total += objArr[x].star
            }
            avg = total / count
            obj[arr[i]].push(avg)
        }
        // this.setState({ reviews: obj[this.props.id] })
    }

    handleClick = (val, num) => {
        if (val === 'star') {
            this.setState({ star: num })
        }
    }

    leaveReview = () => {
        if (this.props.user) {
            return (
                <div className="LeaveReview" >
                    <div className="leavingRatings" >
                        Leave a Review!
                        <div className="leavingRatingImgContainer" >
                            {Svg('svgNoteLeaveReview', 'ratingImg1', 'ratingImg2', 'ratingImg3', 'ratingImg4', 'ratingImg5')}
                        </div>
                    </div>
                    <div className="leavingReviewText" >
                        <input placeholder="Leave a review!" />
                        <button className="leavingReviewButt" >Submit</button>
                    </div>
                </div>
            )
        } else {

        }
    }

    render() {
        return (
            <div className="ReviewBody">
                {this.leaveReview()}
                {this.state.reviews.map(review => (
                    <div className="ReviewInfo" key={review.id}>
                        {review.profile_picture ? <img className="GreyResultsBox" src={review.profile_picture} alt="User profile" /> : <img className="GreyResultsBox" src={require("../Assets/blank_profile.png")} alt="User profile" />}
                        <div className="ReviewInfoItemBox">
                            <div className="ReviewInfoItems1">
                                <p>{review.user_name}</p>
                                {Ratings(review.star)}
                                {review.verified ? <img className="verifiedReview" src={verifiedImg} alt="Verified" /> : null}
                            </div>
                            <div className="ReviewInfoItems2">
                                <p>{`"${review.review_text}"`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { reviews, user } = state
    return {
        reviews,
        user
    }
}

export default withRouter(connect(mapStateToProps)(Reviews))