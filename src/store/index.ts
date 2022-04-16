import {createStore} from 'vuex';

import authentication from './modules/authentication';

import Iauthentication from '@/store/interfaces/Iauthentication';

export interface State {
  authentication: Iauthentication 
}

export default createStore<State>({
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication
  }
});