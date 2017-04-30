/*
* @Author: inksmallfrog
* @Date:   2017-04-26 16:03:43
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 14:46:18
*/

'use strict';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route } from 'react-router-dom';

import ScrollToTop from 'components/ScrollToTop'
import NavBarContainer from 'containers/NavBarContainer';
import MainContainer from 'containers/MainContainer';

import NavBarActions from 'actions/NavBarActions';

import 'styles/iconfont.css';
import 'styles/global.css';

const windowSize = window.innerWidth;
if(windowSize < 560){
    document.documentElement.style.fontSize = 10 + 'px';
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.touchStartPos = {};
        this.state = {
            isPassage: false
        }
    }
    handleTouchStart(e){
        if(e.touches.length == 1){
            this.touchStartPos.x = e.touches[0].pageX;
            this.touchStartPos.y = e.touches[0].pageY;
            this.touchStartPos.handeled = false;
            //e.stopPropagation();
            //e.preventDefault();
        }
    }
    handleTouchMove(e){
        if(!this.touchStartPos.handeled){
            let x = e.touches[0].pageX,
            xStart = this.touchStartPos.x;
            if(x - xStart < -10){
                NavBarActions.hideNavBar();
                this.touchStartPos.handeled = true;
            }
            else if(x - xStart > 10){
                NavBarActions.showNavBar();
                this.touchStartPos.handeled = true;
            }
            //e.stopPropagation();
            //e.preventDefault();
        }
    }
    render(){
        return(
            <Router>
                <ScrollToTop>
                    <div onTouchStart={this.handleTouchStart.bind(this)} onTouchMove={this.handleTouchMove.bind(this)}>
                        <Route path='/' component={NavBarContainer} />
                        <MainContainer />
                    </div>
                </ScrollToTop>
            </Router>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
