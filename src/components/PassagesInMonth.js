/*
* @Author: inksmallfrog
* @Date:   2017-04-28 11:47:08
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 22:15:43
*/

'use strict';
import React from 'react';

import PassageItem from 'components/PassageItem';

import style from 'styles/passageList.css';

export default class PassagesInMonth extends React.Component{
    render(){
        const monthPassages = this.props.passages;
        return(
            <ul className={style.month}>
                <h4 className={style.secTitle}>{this.props.month}月</h4>
                {monthPassages.map((passage)=>{
                    return (
                        <PassageItem key={passage.title} passage={passage} />
                    )
                })}
            </ul>
        )
    }
}

