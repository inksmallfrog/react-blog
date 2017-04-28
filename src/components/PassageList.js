/*
* @Author: inksmallfrog
* @Date:   2017-04-28 10:03:03
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 23:38:31
*/

'use strict';
import React from 'react';

import PassageInYear from 'components/PassageInYear';

import style from 'styles/passageList.css';

import passages from 'data/passages.json';

//Parse all passages to the year-month-day map
let passagesParsed = [],
    passagesYearIndexMap = {},
    passagesYearMonthIndexMap = {};
passages.forEach((passage)=>{
    let date = passage.date.split('-');
    if(date.length != 3){
        //err
    }
    else{
        const year = date[0],
              month = date[1],
              day = date[2]
        if(passagesYearIndexMap[year] == undefined){
            let yearPassages = {
                year: year,
                passages: []
            }
            let index = passagesParsed.push(yearPassages) - 1;
            passagesYearIndexMap[year] = index;
        }
        let yearIndex = passagesYearIndexMap[year],
            yearPassages = passagesParsed[yearIndex],
            yearMonthId = year + '-' + month;

        if(passagesYearMonthIndexMap[yearMonthId] == undefined){
            let monthPassages = {
                month: month,
                passages: []
            }
            let index = yearPassages.passages.push(monthPassages) - 1;
            passagesYearMonthIndexMap[yearMonthId] = index;
        }
        let monthIndex = passagesYearMonthIndexMap[yearMonthId],
            monthPassages = yearPassages.passages[monthIndex];
        monthPassages.passages.push({
            title: passage.title,
            date: day,
            src : passage.src,
            category: passage.category
        });
   }
})
console.log(passagesParsed);
export default class PassageList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passages: passagesParsed
        }
    }
    render(){
        console.log(this.state.passages);
        window.scrollTo(0, 0);
        return(
            <section className={style.allPassages}>
                <header>
                    <h1>墨小蛙</h1>
                    <p className={style.desc}>努力追求技术与艺术的前端小白</p>
                </header>
                {this.state.passages.map((yearPassages)=>{
                    return (
                        <PassageInYear key={yearPassages.year} year={yearPassages.year} passages={yearPassages.passages}/>
                    )
                })}
            </section>
        )
    }
}
