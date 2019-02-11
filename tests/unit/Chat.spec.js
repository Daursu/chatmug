import {mount, createLocalVue, shallowMount} from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import Chat from '@/views/Chat.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Chat.vue', () => {
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
      },
      connected: true,
      messages: [],
      users: [],
    };

    store = new Vuex.Store({
      state,
      actions,
    });
  });

  it('renders messages', () => {
    state.messages = [
      {
        id: '2c85d5c0-8c8e-4e38-90bc-0c57aaca70ed',
        username: 'John',
        message: 'Hello ChatMug',
        timestamp: 1549879200000,
      }
    ];

    const wrapper = mount(Chat, {
      localVue,
      router,
      store,
    });

    expect(wrapper.text()).toMatch('Hello ChatMug');
  });

  it('renders online users', () => {
    state.users = ['John', 'Mike'];

    const wrapper = mount(Chat, {
      localVue,
      router,
      store,
    });

    expect(wrapper.text()).toMatch('John');
    expect(wrapper.text()).toMatch('Mike');
  });

  it('filters users', () => {
    state.users = ['John', 'Mike'];

    const wrapper = mount(Chat, {
      localVue,
      router,
      store,
      data: () => ({ userFilter: 'Jo' }),
    });

    expect(wrapper.text()).toMatch('John');
    expect(wrapper.text()).not.toMatch('Mike');
  });

  it('renders offline message when socket is disconnected', () => {
    state.connected = false;

    const wrapper = shallowMount(Chat, {
      localVue,
      router,
      store,
    });

    expect(wrapper.text()).toMatch('You are currently offline...');
  });
});
