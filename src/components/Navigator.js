/*
* @Author: inksmallfrog
* @Date:   2017-04-28 10:02:52
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 22:49:02
*/

'use strict';
import React from 'react';

import { Link } from 'react-router-dom';

import NavHomeTopContainer from 'containers/NavHomeTopContainer';
import NavPassageTop from 'components/NavPassageTop';

import style from 'styles/navigator.css';

export default ({match})=>{
    const isHome = match.isExact;
    let navTop = isHome ? <NavHomeTopContainer/> : <NavPassageTop/>,
        navClass = isHome ? style.navigator : style.navigator + ' ' + style.passageNav;
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
