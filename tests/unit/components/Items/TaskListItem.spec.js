import TaskListItem from "@/components/Items/TaskListItem.vue"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import flushPromises from "flush-promises"
import Vuex from "vuex"
import VeeValidate from "vee-validate"
const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate)

describe("TasListItem.vue", () => {
  let $store
  let wrapper
  let propsData

  beforeEach(() => {
    $store = {
      dispatch: jest.fn()
    }
    propsData = {
      item: { id: "222-1-1", text: "This is a list item" },
      list: { id: "222-1" },
      board: { id: "222" }
    }

    wrapper = shallowMount(TaskListItem, {
      localVue,
      propsData: propsData,
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })
  })

  it("clears the form data", () => {
    wrapper.setData({
      form: {
        id: "222-1-1",
        text: "This is a list item"
      }
    })

    wrapper.vm.clearForm()

    expect(wrapper.vm.form.id).toBe("")
    expect(wrapper.vm.form.text).toBe("")
  })

  it("saveTaskListItem action is called on save", async () => {
    wrapper.vm.$validator.validateAll = jest.fn(() => Promise.resolve(true))
    wrapper.vm.startEditing()
    wrapper.vm.save()
    await flushPromises()
    expect(wrapper.vm.$validator.validateAll).toHaveBeenCalled()
    expect($store.dispatch).toHaveBeenCalledWith("saveTaskListItem", {
      boardId: propsData.board.id,
      listId: propsData.list.id,
      item: propsData.item
    })
    expect(wrapper.emitted("item-edited")).toBeTruthy()
  })

  it("does not call saveTaskListItem action, when form validation is failed", async () => {
    wrapper.vm.$validator.validateAll = jest.fn(() => Promise.resolve(false))
    wrapper.vm.startEditing()
    wrapper.vm.save()
    await flushPromises()
    expect(wrapper.vm.$validator.validateAll).toHaveBeenCalled()
    expect($store.dispatch).not.toHaveBeenCalled()
    expect(wrapper.emitted("item-edited")).not.toBeTruthy()
  })

  it("emits 'item-editing' event when moving into edit mode", () => {
    wrapper.vm.startEditing()
    // Test if "item-editing event is emitted or not"
    expect(wrapper.emitted("item-editing")).toBeTruthy()
  })

  it("emits 'item-cancelled' event when edit mode is cancelled", () => {
    wrapper.vm.cancel()
    // Test if "item-cancelled event is emitted or not"
    expect(wrapper.emitted("item-cancelled")).toBeTruthy()
  })

  it("Calls 'deleteTaskListItem' action and emit 'item-deleted' event when remove method is called", () => {
    wrapper.vm.remove()

    // Test if "deleteTaskListItem" action have been called
    // with appropriate arguments or not
    expect($store.dispatch).toHaveBeenCalledWith("deleteTaskListItem", {
      boardId: propsData.board.id,
      listId: propsData.list.id,
      item: propsData.item
    })

    // Test if "item-deleted event is emitted or not"
    expect(wrapper.emitted("item-deleted")).toBeTruthy()
  })
})

describe("Test computed properties", () => {
  let wrapper
  let propsData

  beforeEach(() => {
    propsData = {
      item: { id: "", text: "" },
      list: { id: "222-1" },
      board: { id: "222" }
    }
  })

  it("Displays '+ New Item'", () => {
    wrapper = shallowMount(TaskListItem, {
      localVue,
      propsData: propsData,
      stubs: { RouterLink: RouterLinkStub }
    })

    expect(wrapper.vm.displayText).toBe("+ New Item")
  })

  it("Displays 'This is a list item' when item is passed", () => {
    propsData.item = { id: "222-1-1", text: "This is a list item" }

    wrapper = shallowMount(TaskListItem, {
      localVue,
      propsData: propsData,
      stubs: { RouterLink: RouterLinkStub }
    })
    expect(wrapper.vm.displayText).toBe("This is a list item")
  })
})
