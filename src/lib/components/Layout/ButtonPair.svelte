<!--
@component
ButtonPair.svelte — Reusable side-by-side navigation buttons.
-->
<script>
  import { base } from '$app/paths';

  let {
    buttons = [],
    className = 'button-pair-container',
  } = $props();

  function resolveHref(button) {
    if (button.href) {
      return button.href;
    }

    if (button.targetPage) {
      const path = button.targetPage.startsWith('/')
        ? button.targetPage
        : `${base}/${button.targetPage}`;
      return button.targetId ? `${path}?id=${button.targetId}` : path;
    }

    return base + '/';
  }
</script>

<div class={className}>
  {#each buttons as button (button.label)}
    <a
      href={resolveHref(button)}
      class={`button-pair-btn ${button.className || ''}`.trim()}
    >
      {button.label}
    </a>
  {/each}
</div>
