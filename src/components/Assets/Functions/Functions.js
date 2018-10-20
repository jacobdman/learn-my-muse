import React from 'react';


export function lessonLength (num) {
    if (num === 1) {
        return <p>15 Minutes</p>
    } else if (num === 2) {
        return <p>30 Minutes</p>
    } else if (num === 3) {
        return <p>45 Minutes</p>
    } else {
        return <p>60 Minutes</p>
    }
}

export function lessonPriceAvg (price, length) {
    var num1 = 0
    if (length === 1) {
        num1 = 15
    } else if (length === 2) {
        num1 = 30
    } else if (length === 3) {
        num1 = 45
    } else {
        num1 = 60
    }
    var num = price/num1
    if (num >= 1.5) {
        return <p>$$$$</p>
    } else if (num >= 1.25) {
        return <p>$$$</p>
    } else if (num >= 1) {
        return <p>$$</p>
    } else {
        return <p>$</p>
    }
}