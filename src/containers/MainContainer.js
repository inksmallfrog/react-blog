/*
* @Author: inksmallfrog
* @Date:   2017-04-30 14:34:37
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 14:45:13
*/

'use strict';
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import {Container} from 'flux/utils';

import Navigator from 'components/Navigator';
import Passage from 'components/Passage';
import PassageListContainer from 'containers/PassageListContainer';

import NavBarStore from 'stores/NavBarStore';
import NavBarActions from 'actions/NavBarActions';

import style from 'styles/mainSec.css';

class MainContainer extends React.Component{
    static getStores() {
        return [
            NavBarStore,
        ];
    }
    static calculateState() {
        return {
            isNavShow: NavBarStore.getState()
        }
    }
    render(){
        let mainSecStyle = this.state.isNavShow ? style.mainSec + ' ' + style.mainSecRight : style.mainSec;
        return (
            <Router>
            <section className={mainSecStyle}>
                <Route exact path='/' onEnter={()=>{console.log('leave')}} component={PassageListContainer}/>
                <Route path='/aboutme' component={Passage}/>
                <Route path='/passage/:id' component={Passage} onEnter={()=>{console.log('leave')}}/>
            </section>
            </Router>
        )
    }
}

const container = Container.create(MainContainer);

export default container;
