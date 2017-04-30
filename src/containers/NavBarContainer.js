/*
* @Author: inksmallfrog
* @Date:   2017-04-30 13:19:00
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 13:58:18
*/

'use strict';
import React from 'react';
import Navigator from 'components/Navigator';
import {Container} from 'flux/utils';
import NavBarStore from 'stores/NavBarStore';
import NavBarActions from 'actions/NavBarActions';

class NavBarContainer extends React.Component{
    static getStores() {
        return [
            NavBarStore,
        ];
    }
    static calculateState() {
        return {
            isShow: NavBarStore.getState()
        }
    }
    render(){
        return <Navigator isHome={this.props.match.isExact} isShow={this.state.isShow}/>
    }
}

const container = Container.create(NavBarContainer);

export default container;
