/*
* @Author: inksmallfrog
* @Date:   2017-04-28 10:10:29
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 13:00:52
*/

'use strict';
import React from 'react';

import smoothScrollY from 'tools/WindowScroll';

import style from 'styles/navigator.css';

export default class NavPassageTop extends React.Component{
    handleToTop(){
        smoothScrollY(4, 0);
    }
    render(){
        return(
            <ul className={style.navTop}>
                <li><a href="javascript:void(0)" onClick={this.handleToTop.bind(this)}>顶部</a></li>
                <li>评论</li>
            </ul>
        )
    }
}
