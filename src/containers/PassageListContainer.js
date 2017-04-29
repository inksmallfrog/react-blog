/*
* @Author: inksmallfrog
* @Date:   2017-04-29 21:07:10
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 23:18:19
*/

'use strict';
import PassageList from 'components/PassageList';
import {Container} from 'flux/utils';
import CategoryStore from 'stores/CategoryStore';

function getStores() {
  return [
    CategoryStore,
  ];
}

function getState() {
  return {
    categories: CategoryStore.getState(),
  };
}

export default Container.createFunctional(PassageList, getStores, getState);
