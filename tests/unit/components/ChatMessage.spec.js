import { shallowMount } from '@vue/test-utils';
import ChatMessage from '@/components/ChatMessage.vue';

describe('ChatMessage.vue', () => {
  const message = {
    id: '2c85d5c0-8c8e-4e38-90bc-0c57aaca70ed',
    username: 'John',
    message: 'Hello ChatMug',
    timestamp: 1549879200000, // 10:00 am UTC
  };

  it('renders the element ok', () => {
    const wrapper = shallowMount(ChatMessage, {
      propsData: {
        message,
        ownMessage: false,
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders the component', () => {
    const wrapper = shallowMount(ChatMessage, {
      propsData: {
        message,
        ownMessage: false,
      }
    });

    expect(wrapper.html()).toContain('10:00 am');
    expect(wrapper.html()).toContain('John');
    expect(wrapper.html()).toContain('Hello ChatMug');
  });

  it('uses a green background for own messages', () => {
    const wrapper = shallowMount(ChatMessage, {
      propsData: {
        message,
        ownMessage: true,
      }
    });

    expect(wrapper.contains('.bg-green')).toBe(true);
  });
});
