/*
* @Author: inksmallfrog
* @Date:   2017-04-30 12:53:39
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 13:12:23
*/

'use strict';
import AppDispatcher from 'dispatcher/AppDispatcher';
import NavBarActionType from 'actions/NavBarActionType';

const NavBarActions = {
    showNavBar(){
        AppDispatcher.dispatch({
            type: NavBarActionType.SHOW_NAVBAR
        });
    },
    hideNavBar(){
        AppDispatcher.dispatch({
            type: NavBarActionType.HIDE_NAVBAR
        });
    }
};

export default NavBarActions;
