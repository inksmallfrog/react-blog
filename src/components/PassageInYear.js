/*
* @Author: inksmallfrog
* @Date:   2017-04-28 11:41:37
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 22:46:17
*/

'use strict';
import React from 'react';

import PassagesInMonth from 'components/PassagesInMonth';

import style from 'styles/passageList.css';

export default class PassagesInYear extends React.Component{
    render(){
        const yearPassages = this.props.passages;
        return(
            <section className={style.year}>
                <h1 className={style.secTitle}>{this.props.year}年</h1>
                {yearPassages.map((monthPassages)=>{
                    return (
                        <PassagesInMonth key={monthPassages.month} month={monthPassages.month} passages={monthPassages.passages}/>
                    )
                })}
            </section>
        )
    }
}

