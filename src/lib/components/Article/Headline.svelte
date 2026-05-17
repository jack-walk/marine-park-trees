<!--
@component
Headline.svelte — Large Montserrat headline used in the story header.
-->
<script>
  let {
    text = '',
  } = $props();
</script>

{#if text}
  <h1 class="headline">{@html text}</h1>
{/if}

<style lang="scss">
  @use '../../styles' as *;

  .headline {
    max-width: 760px;
    margin: 10px auto;
    text-align: left;
    color: #566500;
    font-weight: bold;
    font-family: 'Montserrat';
    font-size: 40px;
    line-height: 1;
  }

  @media (max-width: 800px) {
    .headline {
      padding-top: 12px;
      font-size: 28px;
      line-height: 1.15;
    }
  }
</style>
