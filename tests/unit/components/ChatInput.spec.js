import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ChatInput from '@/components/ChatInput.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('ChatInput.vue', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      sendMessage: jest.fn(),
    };

    store = new Vuex.Store({
      actions
    });
  });

  it('should not submit message if input is empty', () => {
    const wrapper = shallowMount(ChatInput, { localVue, store });
    wrapper.find('input').trigger('click');
    expect(actions.sendMessage).not.toHaveBeenCalled();
  });

  it('sends a message and clears the input', () => {
    const wrapper = shallowMount(ChatInput, {
      localVue,
      store,
      data: () => ({
        message: 'hello',
      }),
    });

    wrapper.find('input').trigger('keypress.enter');
    expect(actions.sendMessage).toHaveBeenCalledTimes(1);
  });
});
