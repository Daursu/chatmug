import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Home.vue', () => {
  let actions;
  let store;
  let state;

  const router = new VueRouter();

  beforeEach(() => {
    actions = {
      login: jest.fn(),
    };

    state = {
      auth: {
        username: null,
        token: null,
      },
      login: {
        error: null,
      }
    };

    store = new Vuex.Store({
      state,
      actions,
    });
  });

  it('logs the user in', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      router,
      store,
      data: () => ({
        username: 'John',
      }),
    });

    wrapper.find('form').trigger('submit');
    expect(actions.login).toHaveBeenCalledTimes(1);
  });

  it('displays an error message when the username exists', () => {
    const error = 'Username already exists';
    const wrapper = shallowMount(Home, {
      localVue,
      router,
      store,
      data: () => ({
        username: 'John',
      }),

      computed: {
        loginError() {
          return error;
        },
      },
    });

    expect(wrapper.text()).toMatch(error);
  });
});
