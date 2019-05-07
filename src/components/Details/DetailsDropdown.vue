<template>
  <details class="detail-dropdown" ref="details" v-on:toggle="popupToggled()">
    <summary>
      <slot name="handle">...</slot>
    </summary>
    <div class="dropdown-content">
      <slot name="content">
        <label class="content-item">Item 1</label>
        <label class="content-item">Item 2</label>
      </slot>
    </div>
  </details>
</template>
<script>
export default {
  methods: {
    open() {
      this.$refs.details.setAttribute("open", "")
    },
    close() {
      this.$refs.details.removeAttribute("open")
    },
    popupToggled() {
      const isOpen = this.$refs.details.getAttribute("open") !== null ? true : false
      this.$emit("popup-toggled", isOpen)
    }
  }
}
</script>
<style scope>
details.detail-dropdown summary {
  outline: none;
  cursor: pointer;
  display: inline-block;
}

details.detail-dropdown summary::-webkit-details-marker {
  display: none;
}

details.detail-dropdown div.dropdown-content {
  color: #607d8b;
  position: absolute;
  top: 25px;
  left: -40px;
  width: 100px;
  z-index: 99;
  background-color: rgb(236, 245, 248);
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #90909066;
  border-radius: 5px;
}

details.detail-dropdown div.dropdown-content label.content-item {
  width: 100%;
}

details.detail-dropdown div.dropdown-content label.content-item:hover {
  color: #303d44;
}

details[open].detail-dropdown summary:before {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: fadein 200ms ease-in-out;
  cursor: default;
  content: "";
  z-index: 99;
}
</style>
