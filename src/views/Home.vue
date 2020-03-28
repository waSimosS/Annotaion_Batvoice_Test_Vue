<template>
  <div class="home">
    <AnnotationComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import AnnotationComponent from "@/components/AnnotationComponent.vue";

export default {
  name: "home",
  components: {
    AnnotationComponent
  }
};
</script>
