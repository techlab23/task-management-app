<template>
  <div class="card" v-if="!isEditing" @click.prevent="startEditing">
    <div class="card-body">
      <!-- New Item Link Markup Start -->
      <div class="text-center text-dark">
        <span>
          <svg style="width:15px;height:15px" viewBox="0 0 24 24">
            <path fill="#000000" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
          </svg>
          <strong>New item</strong>
        </span>
      </div>
      <!-- Item Display Markup End -->
    </div>
  </div>
  <div class="card" v-else>
    <div class="card-body">
      <form class="form" data-vv-scope="item-form">
        <div class="form-group">
          <textarea name="itemDetails" rows="3" class="form-control" v-model.trim="form.text" v-validate="'required'" data-vv-as="Item Details" placeholder="Your item description"></textarea>
          <small class="text-danger">{{ errors.first('item-form.itemDetails') }}</small>
        </div>
        <div class="form-group text-center">
          <button class="btn btn-outline-secondary btn-sm mr-2" @click.prevent="save">Save</button>
          <button class="btn btn-outline-secondary btn-sm" @click.prevent="cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import ItemMixin from '@/components/Items/ItemMixin'
  export default {
    mixins: [ItemMixin]
  }
</script>