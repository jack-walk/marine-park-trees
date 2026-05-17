<!--
@component
SiteHeader.svelte — Top navigation used across the site.
-->
<script>
  import { base } from '$app/paths';

  let {
    brandLabel = 'REPORTING BY JACK WALKER',
    websiteLabel = 'Website',
    websiteHref = 'https://jackwalker.xyz',
    githubLabel = 'Github',
    githubHref = 'https://github.com/jack-walk',
  } = $props();
</script>

<header class="site-header">
  <div class="masthead-wrapper">
    <nav class="top-nav" aria-label="Site navigation">
      <div class="top-nav__section top-nav__section--left">
        <span class="top-nav__brand-text">{brandLabel}</span>
      </div>

      <div class="top-nav__section top-nav__section--right">
        <a href={websiteHref} class="top-nav__link">{websiteLabel}</a>
        <a href={githubHref} class="top-nav__link">{githubLabel}</a>
        <img
          class="top-nav__bunny-image"
          src={`${base}/photos/bunnies.png`}
          alt="Bunnies"
        />
      </div>
    </nav>
  </div>
</header>

<style lang="scss">
  @use '../../styles' as *;

  .site-header {
    border-bottom: 1px solid #000;
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  .masthead-wrapper {
    background: #fff;
  }

  .top-nav {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: 16px;
    padding: 4px 20px 9px;
    border-bottom: 1px solid #000;
    background: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    line-height: 1.2;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .top-nav__section {
    display: flex;
    align-items: center;
    gap: 18px;
    min-width: 0;
  }

  .top-nav__section--left {
    justify-self: start;
  }

  .top-nav__section--right {
    justify-self: end;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .top-nav__link {
    color: #000;
    text-decoration: none;
    font-family: inherit;
    white-space: nowrap;
  }

  .top-nav__link:hover {
    text-decoration: underline;
  }

  .top-nav__brand-text {
    font-weight: 700;
    color: #000;
    white-space: nowrap;
    cursor: default;
    font-family: 'Montserrat', sans-serif;
  }

  .top-nav__bunny-image {
    display: inline-block;
    align-self: center;
    height: 32px;
    width: auto;
    padding: 0;
    border: 0;
    background: transparent;
  }

  @media (max-width: 600px) {
    .top-nav {
      padding: 8px 12px;
      font-size: 12px;
      gap: 10px;
    }

    .top-nav__section {
      gap: 12px;
    }

    .top-nav__bunny-image {
      height: 26px;
    }
  }
</style>
