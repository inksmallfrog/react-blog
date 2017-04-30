/*
* @Author: inksmallfrog
* @Date:   2017-04-30 13:16:28
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 13:59:29
*/

'use strict';
import {ReduceStore} from 'flux/utils';

import NavBarActionType from 'actions/NavBarActionType';
import AppDispatcher from 'dispatcher/AppDispatcher';

class NavBarStore extends ReduceStore{
    constructor(){
        super(AppDispatcher);
    }
    getInitialState(){
        return false;
    }
    reduce(state, action){
        switch(action.type){
            case NavBarActionType.SHOW_NAVBAR:
                return true;
            case NavBarActionType.HIDE_NAVBAR:
                return false;
            default:
                return state;
        }
    }
}
export default new NavBarStore();
