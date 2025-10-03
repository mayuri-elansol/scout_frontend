import { Meta, StoryObj } from '@storybook/nextjs-vite';
import Appbar from './AppBar';

const meta: Meta<typeof Appbar> = {
  title: 'Components/Organisms/Appbar',
  component: Appbar,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the Appbar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Appbar>;

export const Default: Story = {
  args: {
    title: 'My Application',
  },
};

export const Dashboard: Story = {
  args: {
    title: 'Dashboard',
  },
};

export const Settings: Story = {
  args: {
    title: 'Settings',
  },
};
