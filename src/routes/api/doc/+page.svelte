<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main>
  <h1 text-lg>API Documentation</h1>
  {JSON.stringify(data.endpoints)}
</main>
