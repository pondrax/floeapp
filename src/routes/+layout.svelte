<script lang="ts">
  import "floeui/floe.css";
  import "uno.css";
  import { onMount } from "svelte";

  let theme: any;
  onMount(async () => {
    theme = (await import("floeui/directives/theme")).theme;
  });
  
  const THEMES = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];
</script>

<svelte:head>
  <title>FloeApp</title>
</svelte:head>

<div fixed bottom-50vh right--3 z-20>
  <div dropdown="~ end">
    <button btn="~" pr-5 children-focus-inline-block>
      <i i-bx-extension/>
      <span hidden>Theme</span>
    </button>
    <ul menu w-48 p-3 shadow-2xl h-48 bg-base rounded-box gap-1 mx-5 my-1>
      {#each THEMES as thm}
        <li data-theme={thm}>
          <button
            on:click={() => ($theme = thm)}
            class:ring-4={$theme == thm}
            w-full
            gap-1
            bg-base
            text-base-content
          >
            <span mr-auto>{thm}</span>
            <span bg-primary rounded-xl w-2 h-5 />
            <span bg-secondary rounded-xl w-2 h-5 />
            <span bg-accent rounded-xl w-2 h-5 />
            <span bg-neutral rounded-xl w-2 h-5 />
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>

<slot />

<style>
  :global([placeholder]:empty::before) {
    content: attr(placeholder);
}

:global([placeholder]:empty:focus::before) {
    content: "";
}
</style>