import React, { Component } from 'react';
import './App.css';
import Routes from './routes';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import DevBanner from './DevBanner/DevBanner'
// import Reviews from './components/Reviews/Reviews';

class App extends Component {
  render() {
    return (
      <div className="App">
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Pacifico" />
        <Nav />
        <DevBanner />
        {Routes}
        <Footer />
      </div>
    );
  }
}

export default App;
