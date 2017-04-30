/*
* @Author: inksmallfrog
* @Date:   2017-04-28 14:26:15
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 22:45:39
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
        switch(action.type){
            case CategoryActionType.TOGGLE_CATEGORY:
                if(!action.category) return state;
                else {
                    return state.set(action.category, !state.get(action.category));
                }

            default:
                return state;
        }
    }
}
export default new CategoryStore();
