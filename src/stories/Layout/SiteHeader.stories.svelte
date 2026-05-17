<!--
  SiteHeader.stories.svelte

  Stories for the SiteHeader component.
  SiteHeader displays the top navigation bar used across the site.

  Props:
  - brandLabel: Left-side brand label
  - websiteLabel / websiteHref: First right-side link
  - githubLabel / githubHref: Second right-side link
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SiteHeader from '$lib/components/Layout/SiteHeader.svelte';

  const { Story } = defineMeta({
    title: 'Layout/SiteHeader',
    component: SiteHeader,
    tags: ['autodocs'],
    parameters: {
      // Use fullscreen layout so the header spans the full story width
      layout: 'fullscreen',
    },
    argTypes: {
      brandLabel: {
        control: 'text',
        description: 'Brand label displayed on the left side of the nav',
      },
      websiteLabel: {
        control: 'text',
        description: 'Label for the website link',
      },
      websiteHref: {
        control: 'text',
        description: 'URL for the website link',
      },
      githubLabel: {
        control: 'text',
        description: 'Label for the GitHub link',
      },
      githubHref: {
        control: 'text',
        description: 'URL for the GitHub link',
      },
    },
  });
</script>

<!-- Default: top navigation bar -->
<Story name="Default" />

<!-- Custom label / link text -->
<Story
  name="Custom"
  args={{
    brandLabel: 'REPORTING BY JACK WALKER',
    websiteLabel: 'Website',
    websiteHref: 'https://jackwalker.xyz',
    githubLabel: 'Github',
    githubHref: 'https://github.com/jack-walk',
  }}
/>

