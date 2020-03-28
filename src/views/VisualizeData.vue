<template>
  <div class="home">
    <DataTable></DataTable>
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from "@/components/DataTable.vue";

export default {
  name: "visualizeData",
  components: {
    DataTable
  }
};
</script>