/*
* @Author: inksmallfrog
* @Date:   2017-04-28 10:02:52
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 14:47:16
*/

'use strict';
import React from 'react';

import { Link } from 'react-router-dom';

import NavHomeTopContainer from 'containers/NavHomeTopContainer';
import NavPassageTop from 'components/NavPassageTop';

import style from 'styles/navigator.css';

export default ({isHome, isShow})=>{
    let navTop = isHome ? <NavHomeTopContainer/> : <NavPassageTop/>,
        navClass = isShow ? style.nav + ' ' + style.navShow : style.nav,
        navBox = isHome ? style.navBox : style.navBox + ' ' + style.passageNav;
    return(
        <nav className={navClass}>
            <div className={navBox}>
                {navTop}
                <ul className={style.navBottom}>
                    <li><Link to="/">主页</Link></li>
                    <li><Link to="/aboutme">关于我</Link></li>
                </ul>
            </div>
        </nav>
    )
}
