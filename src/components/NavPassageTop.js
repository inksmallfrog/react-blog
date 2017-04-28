/*
* @Author: inksmallfrog
* @Date:   2017-04-28 10:10:29
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 23:45:31
*/

'use strict';
import React from 'react';
import style from '../styles/navigator.css';
export default class NavPassageTop extends React.Component{
    handleToTop(){
        window.scrollTo(0, 0);
    }
    render(){
        return(
            <ul className={style.navTop}>
                <a href="javascript:void(0)" onClick={this.handleToTop.bind(this)}>顶部</a>
                <li>评论</li>
            </ul>
        )
    }
}
