<template>
  <div class="card" v-if="!isEditing">
    <div class="card-body">
      <div class="text-style disable-select">{{ item.text }}</div>
      <!-- Drag Handle for mobiles -->
      <div class="drag-handle" v-show="shouldUseDragHandle">
        <svg style="width:15px;height:15px" viewBox="0 0 24 24">
          <path fill="#000000" d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z"></path>
        </svg>
      </div>
      <!-- Edit Icon -->
      <div class="edit-icon" @click.prevent="startEditing">
        <svg style="width:15px;height:15px" viewBox="0 0 24 24">
          <path fill="#000000" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z"></path>
        </svg>
      </div>
    </div>
  </div>
  <!-- Form Markup -->
  <div class="card" v-else>
    <div class="card-body">
      <!-- Form Markup Start -->
      <form class="form" data-vv-scope="item-form">
        <div class="form-group">
          <textarea name="itemDetails" rows="3" class="form-control" v-model.trim="form.text" v-validate="'required'" data-vv-as="Item Details"></textarea>
          <small class="text-danger">{{ errors.first('item-form.itemDetails') }}</small>
        </div>
        <div class="form-group d-flex justify-content-between">
          <span>
            <button class="btn btn-outline-secondary btn-sm mr-2" @click.prevent="save">Save</button>
            <button class="btn btn-outline-secondary btn-sm" @click.prevent="cancel">Cancel</button>
          </span>
          <button class="btn btn-sm text-danger" @click.prevent="remove">Delete</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import ItemMixin from '@/components/Items/ItemMixin'
  export default {
    mixins: [ItemMixin],
  }
</script>
<style scope>
  .card {
    min-height: 50px;
    border-bottom: 0.01rem solid rgba(0, 0, 0, 0.9);
    font-size: 13px;
    background-color: rgba(255, 255, 255, 0.85) !important;
    cursor: grab;
  }

  .card-body {
    padding: 1rem !important;
  }

  .card:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  .card:hover div.edit-icon {
    display: block;
  }

  .edit-icon {
    position: absolute;
    top: 5px;
    right: 15px;
    display: none;
    cursor: pointer;
  }

  div.text-style {
    white-space: normal;
    padding-left: 10px;
  }

  .drag-handle {
    position: absolute;
    top: 15px;
    left: 7px;
    margin-right: 5px;
    cursor: pointer;
  }

  .disable-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>