import {ActionContext} from 'vuex';
import {State} from '../index';

import Api from '@/api/Api';

import Iauthentication from "../interfaces/Iauthentication";

type Context = ActionContext<Iauthentication, State>;

export default {
  namespaced: true,
  state: (): Iauthentication => ({
    nuser_obj: {},
    token: ''  
  }),
  getters: {
    NUSER_OBJ: (state: Iauthentication) => {
      return state.nuser_obj;
    },
    TOKEN: (state: Iauthentication) => {
      return state.token;
    },
  },
  mutations: {
    SET_NUSER_OBJ: (state: Iauthentication, nuser_obj: object) => {
      localStorage.setItem('nuser_obj', JSON.stringify(nuser_obj));
      return state.nuser_obj = nuser_obj;
    },
    SET_TOKEN: (state: Iauthentication, token: string) => {
      localStorage.setItem('token', token);
      return state.token = token;
    }
  },
  actions: {
    REGISTER: async (context: Context, formData: object) => {
      const {data} = await Api.post('/auth/register', formData);
      context.commit('SET_NUSER_OBJ', data.nuser_obj);
      context.commit('SET_TOKEN', data.token);
    },
    LOGIN: async (context: Context, formData: object) => {
      const {data} = await Api.post('/auth/login', formData);
      context.commit('SET_NUSER_OBJ', data.nuser_obj);
      context.commit('SET_TOKEN', data.token);
    }
  }
}