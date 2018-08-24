import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { connect } from 'react-redux';
import { updateSearchResults } from '../../ducks/reducer'
import axios from 'axios';
import Ratings from '../Assets/Ratings/Ratings';
import mapIconImg from '../Assets/Map_Icon3.png';

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    map = {}

    componentDidMount() {
        //Map

        mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2JkbWFuIiwiYSI6ImNqa25kdWNtYjAwcmszcHBjbXE5b3hncWgifQ.29q0tdRN14sOMTZYEt2hfA';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            center: [-111.8910, 40.5000],
            zoom: 8,
            attributionControl: false,
            logoPosition: 'bottom-right',
        });

        //Track Current Location

        this.map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            fitBoundsOptions: {
                maxZoom: 11.5
            },
        }));

        //Zoom Controls and Compass

        this.nav = new mapboxgl.NavigationControl();
        this.map.addControl(this.nav, 'top-right');

        //Get the Teacher Locations
        this.checkSearchResults()
    }

    loadedOrNot = () => {
        if (this.map.loaded() === true) {
            this.addData()
        } else {
            setTimeout(this.loadedOrNot, 3000)
        }
    }

    addData = () => {
        // Add the data to your map as a layer
        this.map.addSource('markers', {
            type: 'geojson',
            data: this.state.data
        });
        this.addMarker()
        this.buildLocationList(this.state.data)
    }

    checkSearchResults = () => {
        this.props.searchResults.length === 0 ? this.props.history.push('/results')
        : this.getTeacherlatandlong()
    }

    getTeacherlatandlong = () => {
        let arr = this.props.searchResults
        for (let i = 0; i <= arr.length - 1; i++) {
            if (arr[i].studio_address === null) {
                null //.service_area has cities seperated by ,
            } else if (arr[i].studio_coordinates === null) {
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${arr[i].studio_address}.json?access_token=pk.eyJ1IjoiamFjb2JkbWFuIiwiYSI6ImNqa25kdWNtYjAwcmszcHBjbXE5b3hncWgifQ.29q0tdRN14sOMTZYEt2hfA&country=us`)
                    .then(result => {
                        var string = result.data.features[0].center.toString()
                        axios.post(`http://localhost:4000/api/postTeacherCoordinates/${arr[i].user_id}`, {
                            data: {
                                string: string
                            }
                        })
                            .then(result => {
                                axios.get(`http://localhost:4000/api/searchNew/?instrument=${this.props.searchParams.instrument}&studio=${this.props.searchParams.studio}&inHome=${this.props.searchParams.inHome}`)
                                    .then(result => {
                                        this.props.updateSearchResults(result.data)
                                    })
                            })
                    })
            } else {
                null
            }
        }
        this.pushTeacherInfotoState()
    }

    pushTeacherInfotoState = () => {
        var obj = {
            type: "FeatureCollection",
            features: []
        }
        let arr = this.props.searchResults
        for (let i = 0; i <= arr.length - 1; i++) {
            if (arr[i].studio_address !== null) {
                function formatPhoneNumber(s) {
                    var s2 = ("" + s).replace(/\D/g, '');
                    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
                    return (!m) ? "" : "(" + m[1] + ") " + m[2] + "-" + m[3];
                }
                let phoneFormatted = formatPhoneNumber(arr[i].phone_number)
                let array = JSON.parse("[" + arr[i].studio_coordinates + "]");
                let addressArr = arr[i].studio_address.split(",")
                obj.features.push({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: array
                    },
                    properties: {
                        name: arr[i].full_name,
                        phoneFormatted: phoneFormatted,
                        phone: arr[i].phone_number,
                        address: addressArr[0],
                        city: addressArr[1],
                        country: "United States",
                        postalCode: addressArr[3],
                        state: addressArr[2],
                        userId: arr[i].user_id
                    }
                })
            }
        }
        this.setState({ data: obj })
        this.loadedOrNot()
    }

    flyToStore = (currentFeature) => {
        this.map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    }

    createPopUp = (currentFeature) => {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        // Check if there is already a popup on the map and if so, remove it
        if (popUps[0]) popUps[0].remove();

        var popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML(`<div class='PopupDiv'><h3>${currentFeature.properties.name}</h3>` + '<h4>' + currentFeature.properties.address + ', ' + currentFeature.properties.city + ', '+ currentFeature.properties.state + ' ' +currentFeature.properties.postalCode +'</h4></div>')
            .addTo(this.map);
    }


    buildLocationList = (data) => {
        // Iterate through the list of stores
        for (var i = 0; i < data.features.length; i++) {
            var currentFeature = data.features[i];
            // Shorten data.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = currentFeature.properties;
            // Select the listing container in the HTML and append a div
            // with the class 'item' for each store
            var listings = document.getElementById('listings');
            var listing = listings.appendChild(document.createElement('div'));
            listing.className = 'item';
            listing.id = 'listing-' + i;
            

            // Create a new link with the class 'title' for each store
            // and fill it with the store address
            var link = listing.appendChild(document.createElement('a'));
            link.dataPosition = i;
            link.className = 'link';
            // link.href = '#';
            var newDiv = link.appendChild(document.createElement('div'))
            newDiv.dataPosition = i;
            var divInDiv = newDiv.appendChild(document.createElement('div'))
                divInDiv.className = 'LinkTitle';
                divInDiv.innerHTML = prop.name;
                divInDiv.dataPosition = i;

            var details = newDiv.appendChild(document.createElement('div'));
                    details.dataPosition = i;
                details.innerHTML = prop.city;
                if (prop.phone) {
                    details.innerHTML += ' &middot; ' + prop.phoneFormatted;
                }
            var newObj = Ratings(this.props.reviews[prop.userId][this.props.reviews[prop.userId].length-1])
            var ratingsImg = document.createElement('img')
            ratingsImg.setAttribute('src', newObj.props.src)
            ratingsImg.setAttribute('alt', newObj.props.alt)
            ratingsImg.setAttribute('class', 'MapRatingsImg')
            ratingsImg.dataPosition = i;

            link.appendChild(ratingsImg)

            // Add an event listener for the links in the sidebar listing
            link.addEventListener('click', (e) => {
                
                // Update the currentFeature to the store associated with the clicked link
                // const clickedListing = data.features[this.dataPosition];
                // 1. Fly to the point associated with the clicked link

                this.flyToStore(this.state.data.features[e.target.dataPosition]);
                this.createPopUp(this.state.data.features[e.target.dataPosition]);

                // 3. Highlight listing in sidebar (and remove highlight for all other listings)
                var activeItem = document.getElementsByClassName('active');
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                e.target.parentNode.classList.add('active');
            });
        }
    }

    addMarker = () => {
        var loopArr = this.state.data.features
        for (let i = 0; i <= loopArr.length - 1; i++) {
            const marker = loopArr[i];
            var el = document.createElement('div');
            el.id = "mapMarker-" + i;
            el.className = 'mapMarker';

            console.log('test 1', marker)

            this.map.loadImage(mapIconImg,  (error, image) => {
                if (error) throw error;
                this.map.addImage("mapMarker", image);
                this.map.addLayer({
                    id: el.id,
                    type: "symbol",
                    source: {
                        type: "geojson",
                        data: marker,
                    },
                    layout: {
                    "icon-image": "mapMarker",
                    "icon-size": 0.1
                    }
                })
            })

            el.addEventListener('click', (e) => {
                console.log(marker)
                // 1. Fly to the point
                this.flyToStore(marker);
        
                // 2. Close all other popups and display popup for clicked store
                this.createPopUp(marker);
        
                // 3. Highlight listing in sidebar (and remove highlight for all other listings)
                var activeItem = document.getElementsByClassName('active');
        
                e.stopPropagation();
                if (activeItem[0]) {
                activeItem[0].classList.remove('active');
                }
        
                var listing = document.getElementById('listing-' + i);
                listing.classList.add('active');
        
            });
        }
    }


    render() {
        return (
            <div className="MapBody">
                {console.log(this.state.data)}
                {/* <script src='https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.js'></script> */}
                <link href='https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css' rel='stylesheet' />
                <div className='MapSidebar'>
                    <div className='MapHeading'>
                        <h1>{this.props.searchParams.instrument} Teachers:</h1>
                    </div>
                    <div id='listings' className='listings'></div>
                </div>
                <div id='map' className="map" ></div>
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

export default connect(mapStateToProps, { updateSearchResults })(Map);