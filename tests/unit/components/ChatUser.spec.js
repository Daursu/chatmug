import { shallowMount } from '@vue/test-utils';
import ChatUser from '@/components/ChatUser.vue';

describe('ChatUser.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(ChatUser, {
      propsData: {
        username: 'John',
      },
    });

    expect(wrapper.text()).toMatch('John');
  });
});
