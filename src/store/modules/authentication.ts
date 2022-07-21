import {ActionContext} from 'vuex';
import {State} from '../index';

import Swal from 'sweetalert2';

import Api from '@/api/Api';
import router from '@/router';

import Iauthentication from "../interfaces/Iauthentication";

type Context = ActionContext<Iauthentication, State>;

export default {
  namespaced: true,
  state: (): Iauthentication => ({
    nuser_obj: JSON.parse(localStorage.getItem("nuser_obj") as string),
    token: localStorage.getItem("token") as string  
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
      state.nuser_obj = nuser_obj;
    },
    SET_TOKEN: (state: Iauthentication, token: string) => {
      localStorage.setItem('token', token);
      state.token = token;
    },
    LOGOUT: (state: Iauthentication) => {
      localStorage.clear();
      state.nuser_obj = JSON.parse(localStorage.getItem("nuser_obj") as string);
      state.token = localStorage.getItem("token") as string;
      router.push('/auth/login');
    }
  },
  actions: {
    REGISTER: async (context: Context, formData: object) => {
      try {
        const {data} = await Api.post('/auth/register', formData);
        context.commit('SET_NUSER_OBJ', data.nuser_obj);
        context.commit('SET_TOKEN', data.token);
        Swal.fire({
          title: "Nice!",
          text: "Your account has been created successfully! :)",
          icon: "success"
        });
        router.push('/browse');
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
    LOGIN: async (context: Context, formData: object) => {
      try {
        const {data} = await Api.post('/auth/login', formData);
        context.commit('SET_NUSER_OBJ', data.nuser_obj);
        context.commit('SET_TOKEN', data.token);
        Swal.fire({
          title: "Nice!",
          text: "Your have logged in successfully!",
          icon: "success"
        });
        router.push('/browse');
        // router.push('/');
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
  }
}