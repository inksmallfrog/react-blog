/*
* @Author: inksmallfrog
* @Date:   2017-04-28 11:47:08
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 22:57:06
*/

'use strict';
import React from 'react';

import PassageItem from 'components/PassageItem';

import style from 'styles/passageList.css';

export default function PassagesInMonth(props){
    const monthPassages = props.passages;
    return(
        <ul className={style.month}>
            <h4 className={style.secTitle}>{props.month}月 ({monthPassages.length})</h4>
            {monthPassages.map((passage)=>{
                return (
                    <PassageItem key={passage.title} passage={passage} />
                )
            })}
        </ul>
    )
}

