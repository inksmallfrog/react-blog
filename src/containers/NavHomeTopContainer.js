/*
* @Author: inksmallfrog
* @Date:   2017-04-29 21:10:15
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 20:40:54
*/

'use strict';
import NavHomeTop from 'components/NavHomeTop';
import {Container} from 'flux/utils';
import CategoryStore from 'stores/CategoryStore';
import CategoryActions from 'actions/CategoryActions';

function getStores() {
  return [
    CategoryStore
  ];
}

function getState() {
  return {
    categories: CategoryStore.getState(),
    onToggleCategory: CategoryActions.toggleCategory
  };
}

let NavHomeTopContainer = Container.createFunctional(NavHomeTop, getStores, getState);

export default NavHomeTopContainer;
