/*
* @Author: inksmallfrog
* @Date:   2017-04-28 10:02:52
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 12:13:00
*/

'use strict';
import React from 'react';

import { Link } from 'react-router-dom';

import NavHomeTop from './NavHomeTop';
import NavPassageTop from './NavPassageTop';

import style from '../styles/navigator.css';

export default ({match})=>{
    const isHome = match.isExact;
    let navTop = isHome ? <NavHomeTop/> : <NavPassageTop/>,
        navClass = isHome ? style.navigator : style.navigator + " " + style.passageNav;
    return(
        <nav className={style.navigatorBox}>
            <div className={navClass}>
                {navTop}
                <ul className={style.navBottom}>
                    <li><Link to="/">主页</Link></li>
                    <li><Link to="/aboutme">关于我</Link></li>
                </ul>
            </div>
        </nav>
    )
}
