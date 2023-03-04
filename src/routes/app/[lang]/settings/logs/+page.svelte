<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
  console.log(data);
</script>

<div py-10>
  <h1 text-lg pb-2>Logs</h1>

  <form method="post" action="?/make" use:enhance>
    <label>
      Name
      <input input name="uri" placeholder="Uri" />
    </label>
    <label>
      Fields
      <input input name="uri" placeholder="Uri" />
    </label>

    <button btn="~ primary" mt-3>Make</button>
  </form>
</div>
