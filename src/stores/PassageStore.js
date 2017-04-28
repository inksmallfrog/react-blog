/*
* @Author: inksmallfrog
* @Date:   2017-04-28 14:26:15
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 14:32:03
*/

'use strict';
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import {Passage} from 'data/Passage';
import PassageActionType from 'action/PassageActionType';
import PassageDispatcher from 'dispatcher/PassageDispatcher';

class PassageStore extends ReduceStore{
    constructor(){
        super(PassageDispatcher);
    }
    getInitialState(){
        return Immutable.OrderedMap();
    }
    reduce(state, action){
        switch(action.type){
            case PassageDispatcher.LIST_PASSAGES:
                break;
        }
    }
}
