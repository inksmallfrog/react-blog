/*
* @Author: inksmallfrog
* @Date:   2017-04-28 11:50:21
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 13:34:16
*/

'use strict';
import React from 'react';

import { Link } from 'react-router-dom';

import style from 'styles/passageList.css';

const categories = [""]

export default class PassageItem extends React.Component{
    render(){
        const passage = this.props.passage;
        let categoryIcon = 'iconfont ';
        switch(passage.category){
            case '技术':
            case 'tech':
                categoryIcon += 'icon-tech';
                break;
            case '艺术':
            case 'artist':
                categoryIcon += 'icon-artist';
                break;
            default:
                categoryIcon += 'icon-life';
                break;
        }
        return(
            <li className={style.passage}>
                <p className={style.category}><span className={categoryIcon}></span></p>
                <p className={style.pDate}>{passage.date}日</p>
                <Link to={'/passage/' + passage.src}><a href="javascript:void(0)" className={style.link}>{passage.title}</a></Link>
            </li>
        )
    }
}

