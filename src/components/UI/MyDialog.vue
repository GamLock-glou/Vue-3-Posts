<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '../../mixins/toggleMixin';
export default {
  name: "my-dialog",
  emits: ['update:show'],
  mixins: [toggleMixin]
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background-color: white;
  border-radius: 12px;
  min-width: 300px;
  min-height: 50px;
  padding: 20px;
}
</style>