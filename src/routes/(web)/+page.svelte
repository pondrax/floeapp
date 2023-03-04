<script lang="ts">
    import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  onMount(() => {
    if (data.session) {
      goto("/app/en");
    }
  });
</script>

<main p-2 min-h-screen h-screen>
  <div p-4 bg-base rounded-box min-h-full>
    <h1 text-2xl py-6>Welcome to FloeApp</h1>
    <p>
      Simplicity is the best
      <br />
      <a href="/auth/signin" text-primary underline>Sign In</a>
    </p>
  </div>
</main>
