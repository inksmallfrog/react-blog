/*
* @Author: inksmallfrog
* @Date:   2017-04-28 10:13:51
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 23:05:58
*/

'use strict';
import React from 'react';
import style from 'styles/navigator.css';


export default function NavHomeTop(props){
    let categoriesSelected = props.categories;
    let lifeClass = 'iconfont icon-life ' + (categoriesSelected.get('生活') ? style.categorySelected : ''),
        techClass = 'iconfont icon-tech ' + (categoriesSelected.get('技术') ? style.categorySelected : ''),
        artistClass = 'iconfont icon-artist ' + (categoriesSelected.get('艺术') ? style.categorySelected : '');
    return(
        <ul className={style.navTop}>
            <img src="" alt="favicon"/>
            <p>
                <a href="javascript:void(0)"
                    className={style.categoryLink}
                    onClick={(e) => {
                        props.onToggleCategory('生活');
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <span className={lifeClass}></span>
                </a>
                =
                <a href="javascript:void(0)"
                    className={style.categoryLink}
                    onClick={(e) => {
                        props.onToggleCategory('技术');
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <span className={techClass}></span>
                </a>
                +
                <a href="javascript:void(0)"
                    className={style.categoryLink}
                    onClick={(e) => {
                        props.onToggleCategory('艺术');
                        e.stopPropagation();
                        e.preventDefault();
                    }}>
                    <span className={artistClass}></span>
                </a>
            </p>
        </ul>
    )
}
