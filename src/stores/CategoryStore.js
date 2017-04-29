/*
* @Author: inksmallfrog
* @Date:   2017-04-28 14:26:15
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 22:51:14
*/

'use strict';
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import CategoryActionType from 'actions/CategoryActionType';
import AppDispatcher from 'dispatcher/AppDispatcher';

class CategoryStore extends ReduceStore{
    constructor(){
        super(AppDispatcher);
    }
    getInitialState(){
        return Immutable.OrderedMap({
            '生活': true,
            '技术': true,
            '艺术': true
        });
    }
    reduce(state, action){
        console.log(action.type);
        switch(action.type){
            case CategoryActionType.TOGGLE_CATEGORY:
                console.log(action);
                if(!action.category) return state;
                else {
        console.log(action);
                    return state.set(action.category, !state.get(action.category));
                }

            default:
                return state;
        }
    }
}
export default new CategoryStore();
