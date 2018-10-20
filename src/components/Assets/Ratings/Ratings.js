import React from 'react';
import './Ratings.css';
import img5 from './5.png'
import img4 from './4.png'
import img3 from './3.png'
import img2 from './2.png'
import img1 from './1.png'

export default function Nav (num) {
    if (num === 5) {
        return <img className="ratingsImg" src={img5} alt={`${num} stars`} />
    } else if (num >= 4) {
        return <img className="ratingsImg" src={img4} alt={`${num} stars`} />
    } else if (num >= 3) {
        return <img className="ratingsImg" src={img3} alt={`${num} stars`} />
    } else if (num >= 2) {
        return <img className="ratingsImg" src={img2} alt={`${num} stars`} />
    } else {
        return <img className="ratingsImg" src={img1} alt={`${num} stars`} />
    }
}