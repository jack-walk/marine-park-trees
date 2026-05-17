<!--
  ButtonPair.stories.svelte

  Stories for the ButtonPair component.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ButtonPair from '$lib/components/Layout/ButtonPair.svelte';

  const { Story } = defineMeta({
    title: 'Layout/ButtonPair',
    component: ButtonPair,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
    argTypes: {
      buttons: {
        control: 'object',
        description: 'Array of button config objects',
      },
      className: {
        control: 'text',
        description: 'Container class name',
      },
    },
  });
</script>

<Story
  name="Default"
  args={{
    buttons: [
      { label: 'COMPARE ZIP CODES', href: '/compare' },
      { label: 'ABOUT THIS DATA', href: '/about' },
    ],
  }}
/>

<Story
  name="Back Button"
  args={{
    buttons: [{ label: '← Back to Article', href: '/', className: 'back-btn' }],
  }}
/>