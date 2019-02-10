import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import io from 'socket.io-client';
import uuid from 'uuid';

Vue.use(Vuex);

const STORAGE_KEY = 'chatmug_auth';
let socket;

export default new Vuex.Store({
  state: {
    auth: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {
      token: false,
      username: null,
    },
    login: {
      error: null,
    },
    connected: false,
    messages: [],
    users: [],
  },

  mutations: {
    storeAuth(state, { token, username }) {
      state.auth.token = token;
      state.auth.username = username;
      state.login.error = null;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.auth));
    },

    logout(state) {
      state.auth.token = false;
      state.auth.username = null;
      state.login.error = null;

      window.localStorage.removeItem(STORAGE_KEY);
    },

    storeLoginError(state, error) {
      state.login.error = error;
    },

    connected(state, status) {
      state.connected = status;
    },

    messageReceived(state, data) {
      state.messages.push(data);
    },

    refreshUsers(state, users) {
      console.log(users);
      state.users = users;
    },

    addUser(state, username) {
      state.users.push(username);
    },

    removeUser(state, username) {
      const index = state.users.indexOf(username);

      if (index > -1) {
        state.users.splice(index, 1);
      }
    },
  },

  actions: {
    login({ commit }, username) {
      return axios
        .post('http://chatmug-node.local:3000/login', {
          username,
        })
        .then(({ data }) => commit('storeAuth', { token: data.token, username }))
        .catch(error => commit('storeLoginError', error.response.data.error));
    },

    logout({ commit }) {
      return new Promise(resolve => {
        socket.emit('logout');
        socket.disconnect();
        commit('logout');
        resolve();
      });
    },

    connect({ commit }) {
      return new Promise((resolve) => {
        socket = io('http://chatmug-node.local:3000', {
          query: {
            token: this.state.auth.token,
          },
        });

        socket.on('connect', () => {
          commit('connected', true);
          resolve();
        });

        // Handle the disconnect event
        socket.on('disconnect', () => commit('connected', false));

        // Listen for incoming messages
        socket.on('message', data => commit('messageReceived', data));

        // Retrieved a list of connected users
        socket.on('users', users => commit('refreshUsers', users));

        socket.on('joined', ({ username }) => commit('addUser', username));
        socket.on('left', ({ username }) => commit('removeUser', username));
      });
    },

    sendMessage({ commit }, message) {
      return new Promise((resolve, reject) => {
        if (!this.state.connected) {
          return reject(new Error('You are not connected'));
        }

        socket.emit('message', message);
        commit('messageReceived', {
          id: uuid(),
          username: this.state.auth.username,
          message,
          timestamp: Date.now(),
        });

        return resolve();
      });
    },
  },
});
