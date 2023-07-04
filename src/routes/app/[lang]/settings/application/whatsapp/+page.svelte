<script lang="ts">
  import { enhance } from "$app/forms";
import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <h1>Whatsapp</h1>

  <form action="?/add" method="post" use:enhance>
    <input name="name">
    <button>Add</button>
  </form>
  {JSON.stringify(data.whatsapp)}
</div>
