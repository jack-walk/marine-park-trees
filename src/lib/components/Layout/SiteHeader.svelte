<!--
@component
SiteHeader.svelte — Top navigation used across the site.
-->
<script>
  import { base } from '$app/paths';

  let {
    brandLabel = '[JACK-WALK]',
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
        <div class="top-nav__bunny-wrap" aria-hidden="true">
          <img
            class="top-nav__bunny-image top-nav__bunny-image--desktop"
            src={`${base}/photos/bunnies.png`}
            alt="Bunnies"
          />
          <img
            class="top-nav__bunny-image top-nav__bunny-image--mobile"
            src={`${base}/photos/bunnies.png`}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>

      <div class="top-nav__section top-nav__section--center" aria-label="Site brand">
        <a href={websiteHref} class="top-nav__brand-link" aria-label={brandLabel}>
          <span class="top-nav__brand-text">{brandLabel}</span>
        </a>
      </div>

      <div class="top-nav__section top-nav__section--right">
        <a href={websiteHref} class="top-nav__link">{websiteLabel}</a>
        <a href={githubHref} class="top-nav__link">{githubLabel}</a>
      </div>
    </nav>
  </div>
</header>

<style lang="scss">
  @use '../../styles' as *;

  .site-header {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  .masthead-wrapper {
    background: #fff;
  }

  .top-nav {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    column-gap: 16px;
    padding: 8px 20px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 0 0 rgba(0, 0, 0, 0.2);
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

  .top-nav__section--center {
    justify-self: center;
    justify-content: center;
  }

  .top-nav__section--right {
    justify-self: end;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .top-nav__link,
  .top-nav__brand-link {
    color: #000;
    text-decoration: none;
    font-family: inherit;
    white-space: nowrap;
    align-self: center;
    display: flex;
    align-items: center;
  }

  .top-nav__link:hover,
  .top-nav__brand-link:hover {
    text-decoration: underline;
  }

  .top-nav__brand-link:hover,
  .top-nav__brand-link:focus,
  .top-nav__brand-link:visited,
  .top-nav__brand-link:active {
    color: rgba(0, 0, 0, 0.72);
    background: transparent;
  }

  .top-nav__brand-link:hover {
    text-decoration: none;
  }

  .top-nav__bunny-wrap {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    cursor: default;
  }

  .top-nav__brand-text {
    font-size: 15px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.72);
    white-space: nowrap;
    cursor: default;
    font-family: 'Montserrat', sans-serif;
    display: inline-block;
  }

  .top-nav__bunny-image {
    display: inline-block;
    align-self: center;
    height: 28px;
    width: auto;
    padding: 0;
    border: 0;
    background: transparent;
  }

  .top-nav__bunny-image--mobile {
    display: none;
  }

  .top-nav__bunny-image--desktop {
    display: inline-block;
  }

  @media (max-width: 600px) {
    .top-nav {
      padding: 8px 12px;
      font-size: 12px;
      gap: 10px;
      grid-template-columns: 1fr auto 1fr;
    }

    .top-nav__brand-text {
      font-size: 14px;
    }

    .top-nav__section {
      gap: 12px;
    }

    .top-nav__bunny-image {
      height: 26px;
    }

    .top-nav__bunny-image--mobile {
      display: inline-block;
    }

    .top-nav__bunny-image--desktop {
      display: none;
    }
  }
</style>
