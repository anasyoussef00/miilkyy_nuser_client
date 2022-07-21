import {ActionContext} from 'vuex';
import {State} from '../index';

import Swal from 'sweetalert2';

import Api from '@/api/Api';
import router from '@/router';

import INuse from "@/interfaces/INuse";

// type Context = ActionContext<Inuse, State>;

export default {
  namespaced: true,
  state: () => ({ 
    nuseList: []
  }),
  getters: {
    GET_NUSE_LIST: (state: any) => {
      return state.nuseList;
    },
    GET_PROFILE_NUSE: (state: any) => {
      return state.profileNuse;
    }
  },
  mutations: {
    FILL_NUSE_LIST: (state: any, nuseList: INuse[]) => {
      return state.nuseList = nuseList;
    },
    FILL_PROFILE_NUSE: (state: any, profileNuse: INuse[]) => {
      return state.profileNuse = profileNuse;
    },
  },
  actions: {
    GET_LIST_OF_NUSE: async ({commit, rootState}: any) => {
      try {
        const {data} = await Api.get('nuse/all', {
          headers: {
            'Authorization': `Bearer ${rootState.authentication.token}`
          }
        });
        commit('FILL_NUSE_LIST', data);
      } catch(err: any) {
        Swal.fire({
          toast: true,
          title: "Oops...!",
          text: err.response.data.message,
          icon: "error",
          position: "bottom"
        });
      }
    },
    DELETE_NUSE: async ({dispatch, rootState}: any, nuseId: number) => {
      try {
        await Api.delete(`nuse/delete/${nuseId}`, {
          headers: {
            'Authorization': `Bearer ${rootState.authentication.token}`
          }
        });
        dispatch('GET_LIST_OF_NUSE');
        Swal.fire({
          toast: true,
          title: "Nice!",
          text: 'Nuse deleted successfully',
          icon: "success",
          position: "bottom"
        });
      } catch(err: any) {
        Swal.fire({
          toast: true,
          title: "Oops...!",
          text: err.response.data.message,
          icon: "error",
          position: "bottom"
        });
      }
    }
    // GET_SPECIFIC_USER_NUSE: async ({commit, rootState}: any, nuserId: number) => {
    //   try {
    //     const {data} = await Api.get(`profile/${nuserId}`);
    //     commit('FILL_PROFILE_NUSE', data);
    //   } catch(err: any) {
    //     Swal.fire({
    //       toast: true,
    //       title: "Oops...!",
    //       text: err.response.data.message,
    //       icon: "error",
    //       position: "bottom"
    //     });
    //   }
    // }
  }
}