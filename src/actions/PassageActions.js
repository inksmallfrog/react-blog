/*
* @Author: inksmallfrog
* @Date:   2017-04-28 14:17:04
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-28 14:24:44
*/

'use strict';
const AppDispatcher = require('dispather/PassageDispatcher'),
      PassageConstants = require('action/PassageActionType');

let TodoActions = {
    list(){
        AppDispatcher.dispatch({
            actionType: PassageConstants.LIST_PASSAGES
        })
    },
    getPassage(passageId){
        AppDispatcher.dispatch({
            actionType: PassageConstants.GET_PASSAGE,
            id: passageId
        })
    }
}
