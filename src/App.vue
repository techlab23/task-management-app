<template>
  <div id="app" class="container-fluid">
    <NavHeader></NavHeader>
    <transition name="page" mode="out-in" v-if="!this.$store.getters.isLoading">
      <router-view></router-view>
    </transition>
    <LoadingIndicator></LoadingIndicator>
  </div>
</template>
<script>
  import NavHeader from "@/components/NavHeader";
  import LoadingIndicator from "@/components/LoadingIndicator";
  export default {
    name: "App",
    components: {
      NavHeader,
      LoadingIndicator
    },
    beforeCreate() {
      this.$store.dispatch('fetchData')
    }
  };
</script>
<style>
  body {
background-color: rgba(72, 163, 184, 0.05) !important;
}
.page-enter-active,
.page-leave-active {
transition: opacity .2s
}
.page-enter,
.page-leave-active {
opacity: 0
}
</style>