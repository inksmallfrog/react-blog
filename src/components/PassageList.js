/*
* @Author: inksmallfrog
* @Date:   2017-04-28 10:03:03
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 23:06:13
*/

'use strict';
import React from 'react';

import PassageInYear from 'components/PassageInYear';

import style from 'styles/passageList.css';

import passages from 'data/passages.json';

const categoriesAllowed = ['生活', '技术', '艺术'];

//Parse all passages to the year-month-day map with given category
function parsePassages(categoriesSelected){
    let passagesParsed = [],
        passagesYearIndexMap = {},
        passagesYearMonthIndexMap = {};
    passages.forEach((passage)=>{
        //将默认的分类设置为生活
        if(categoriesAllowed.indexOf(passage.category) < 0){
            passage.category = '生活';
        }
        //仅打包在给定分类内的文章
        if(categoriesSelected.get(passage.category)){
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
        }
    })
    return passagesParsed;
}

export default function PassageList(props){
    let passages = parsePassages(props.categories);
    return(
        <section className={style.allPassages}>
            <header>
                <h1>墨小蛙</h1>
                <p className={style.desc}>努力追求技术与艺术的前端小白</p>
            </header>
            {passages.map((yearPassages)=>{
                return (
                    <PassageInYear key={yearPassages.year} year={yearPassages.year} passages={yearPassages.passages}/>
                )
            })}
        </section>
    )
}
