/*
* @Author: inksmallfrog
* @Date:   2017-04-26 16:03:43
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 16:50:10
*/

'use strict';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route } from 'react-router-dom';

import ScrollToTop from 'components/ScrollToTop'
import Navigator from 'components/Navigator';
import PassageList from 'components/PassageList'
import Passage from 'components/Passage';

import 'styles/global.css';
import style from 'styles/root.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isPassage: false
        }
    }
    render(){
        return(
            <Router>
                <ScrollToTop>
                    <div>
                        <Route path='/' component={Navigator} />
                        <section className={style.mainSec}>
                            <Route exact path='/' component={PassageList}/>
                            <Route path='/aboutme' component={Passage}/>
                            <Route path='/passage/:id' component={Passage}/>
                        </section>
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
