<template>
  <RenderlessItem :item="item" @item-editing="() => $emit('item-editing')" @item-edited="(item) => $emit('item-edited',item)" @item-cancelled="() => $emit('item-cancelled')">
    <template v-slot="{ item, startEditing, save, cancel, isEditing, inputProps, inputEvents }">
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
          <!-- Form Markup Start -->
          <div class="form">
            <div class="form-group">
              <textarea rows="3" class="form-control" v-bind="inputProps" v-on="inputEvents"></textarea>
            </div>
            <div class="form-group text-center">
              <button class="btn btn-outline-primary btn-sm mr-2" @click.prevent="save">Save</button>
              <button class="btn btn-outline-secondary btn-sm" @click.prevent="cancel">Cancel</button>
            </div>
          </div>
          <!-- Form Markup End -->
        </div>
      </div>
    </template>
  </RenderlessItem>
</template>
<script>
  import RenderlessItem from '@/components/Renderless/RenderlessItem'
  export default {
    props: ['item'],
    components: {
      RenderlessItem
    }
  }
</script>