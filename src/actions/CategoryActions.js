/*
* @Author: inksmallfrog
* @Date:   2017-04-28 14:17:04
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 22:51:26
*/

'use strict';
import AppDispatcher from 'dispatcher/AppDispatcher';
import CategoryActionType from 'actions/CategoryActionType';

const CategoryActions = {
    toggleCategory(category){
        AppDispatcher.dispatch({
            type: CategoryActionType.TOGGLE_CATEGORY,
            category: category
        })
    }
};

export default CategoryActions;
