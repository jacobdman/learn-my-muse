import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import './MapDirections.css'

export default class MapDirections extends Component {
    
    componentDidMount() {

        //Map

        mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2JkbWFuIiwiYSI6ImNqa25kdWNtYjAwcmszcHBjbXE5b3hncWgifQ.29q0tdRN14sOMTZYEt2hfA';
        this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [ -111.8910, 40.5000 ],
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

        // this.marker = new mapboxgl.Marker()
        //     .setLngLat([-110.9500, 40.5900])
        //     .addTo(this.map);

    }


    render() {
        return (
            <div className="MapBody">
                <script src='https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.js'></script>
                <link href='https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css' rel='stylesheet' />
                Map
                <div id='map'></div>
            </div>
        )
    }
}