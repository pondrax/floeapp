<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  // console.log(data);
</script>

<div py-10>
  App Page
  <pre whitespace-pre-wrap text-xs>
    {JSON.stringify(data, null, 2)}
  </pre>
</div>
