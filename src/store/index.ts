import {createStore} from 'vuex';

import authentication from './modules/authentication';
import nuse from './modules/nuse';

import Iauthentication from '@/store/interfaces/Iauthentication';
// import Inuse from '@/store/interfaces/Inuse';

export interface State {
  authentication: Iauthentication,
  // nuse: Inuse 
}

export default createStore<State>({
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication,
    nuse
  }
});