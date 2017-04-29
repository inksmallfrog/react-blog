/*
* @Author: inksmallfrog
* @Date:   2017-04-28 11:41:37
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 22:57:43
*/

'use strict';
import React from 'react';

import PassagesInMonth from 'components/PassagesInMonth';

import style from 'styles/passageList.css';

export default function PassagesInYear(props){
    const yearPassages = props.passages;
    let passagesCount = 0;
    yearPassages.forEach(monthPassages=>{passagesCount += monthPassages.passages.length;});
    return(
        <section className={style.year}>
            <h1 className={style.secTitle}>{props.year}年 ({passagesCount})</h1>
            {yearPassages.map((monthPassages)=>{
                return (
                    <PassagesInMonth key={monthPassages.month} month={monthPassages.month} passages={monthPassages.passages}/>
                )
            })}
        </section>
    )
}

