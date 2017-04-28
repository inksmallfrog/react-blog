/*
* @Author: inksmallfrog
* @Date:   2017-04-28 11:50:21
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 22:16:07
*/

'use strict';
import React from 'react';

import { Link } from 'react-router-dom';

import style from 'styles/passageList.css';

const categories = [""]

export default class PassageItem extends React.Component{
    render(){
        const passage = this.props.passage;
        return(
            <li className={style.passage}>
                <p className={style.pDate}>{passage.date}日</p>
                <Link to={'/passage/' + passage.src}>{passage.title}</Link>
            </li>
        )
    }
}

