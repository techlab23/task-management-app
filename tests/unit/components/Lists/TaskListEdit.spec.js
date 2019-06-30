import TaskListEdit from "@/components/Lists/TaskListEdit.vue"
import { mount, shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import flushPromises from "flush-promises"
import Vuex from "vuex"
import VeeValidate from "vee-validate"
const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VeeValidate)

describe("TaskListEdit.vue", () => {
  let $store
  let wrapper

  beforeEach(() => {
    $store = {
      dispatch: jest.fn(),
      getters: {
        activeBoard: { id: 222 }
      }
    }
    wrapper = mount(TaskListEdit, {
      sync: false,
      localVue,
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })
  })

  it("Heading property returns 'Create new list' if creating a new list", () => {
    expect(wrapper.vm.heading).toBe("Create new list")
  })

  it("Heading property returns 'Update list name' if editing existing list", () => {
    wrapper.setData({
      listForm: {
        id: "222-2"
      }
    })
    expect(wrapper.vm.heading).toBe("Update list name")
  })

  it("saveTaskList action is called on handleTaskListSave", async () => {
    wrapper.setData({
      listForm: {
        id: "222-2",
        name: "todo"
      }
    })

    wrapper.vm.$validator.validateAll = jest.fn(() => Promise.resolve(true))
    wrapper.vm.handleTaskListEditing({ id: wrapper.vm.listForm.id, name: wrapper.vm.listForm.name })
    wrapper.vm.handleTaskListSave()
    await flushPromises()

    expect(wrapper.vm.$validator.validateAll).toHaveBeenCalled()

    expect($store.dispatch).toHaveBeenCalledWith("saveTaskList", {
      boardId: $store.getters.activeBoard.id,
      listId: wrapper.vm.listForm.id,
      name: wrapper.vm.listForm.name
    })
  })

  it("does not call saveTaskList action, when form validation fails", async () => {
    wrapper.setData({
      listForm: {
        id: "222-2",
        name: ""
      }
    })

    wrapper.vm.$validator.validateAll = jest.fn(() => Promise.resolve(false))
    wrapper.vm.handleTaskListEditing({ id: wrapper.vm.listForm.id, name: wrapper.vm.listForm.name })
    wrapper.vm.handleTaskListSave()
    await flushPromises()

    expect(wrapper.vm.$validator.validateAll).toHaveBeenCalled()
    expect($store.dispatch).not.toHaveBeenCalled()
  })

  it("clears listForm data when popup is closed", () => {
    wrapper.setData({
      listForm: {
        id: "222-2",
        name: "todo"
      }
    })
    wrapper.vm.handlePopupToggled(false)
    expect(wrapper.vm.listForm.id).toBe(0)
    expect(wrapper.vm.listForm.name).toBe("")
  })

  it("listForm data is not cleared when popup is opened", () => {
    wrapper.setData({
      listForm: {
        id: "222-2",
        name: "todo"
      }
    })
    wrapper.vm.handlePopupToggled(true)
    expect(wrapper.vm.listForm.id).toBe("222-2")
    expect(wrapper.vm.listForm.name).toBe("todo")
  })
})

describe("Test boardName computed Property", () => {
  let $store
  let wrapper

  it("boardName returns name of the active board", () => {
    $store = {
      getters: {
        activeBoard: { id: 222, name: "tracker", description: "tracker board", archived: false }
      }
    }

    wrapper = shallowMount(TaskListEdit, {
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })

    expect(wrapper.vm.boardName).toBe("tracker")
  })

  it("boardName returns '' if active board is not found", () => {
    $store = {
      getters: {
        activeBoard: null
      }
    }

    wrapper = shallowMount(TaskListEdit, {
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })

    expect(wrapper.vm.boardName).toEqual("")
  })
})
