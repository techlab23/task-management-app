import TaskBoardEdit from "@/components/Boards/TaskBoardEdit.vue"
import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import flushPromises from "flush-promises"
import Vuex from "vuex"
import VeeValidate from "vee-validate"
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)

import { Bus } from "@/utils/bus"
Bus.$on = jest.fn()

describe("TaskBoardEdit.vue", () => {
  let $store
  let wrapper

  beforeEach(() => {
    $store = {
      dispatch: jest.fn(),
      getters: {
        activeBoard: { id: "222" }
      }
    }
    wrapper = mount(TaskBoardEdit, {
      sync: false,
      localVue,
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })
  })

  it("clear boardForm data on handlePopupToggled", () => {
    wrapper.vm.handlePopupToggled(false)
    expect(wrapper.vm.boardForm.id).toBe(0)
    expect(wrapper.vm.boardForm.name).toBe("")
    expect(wrapper.vm.boardForm.description).toBe("")
  })

  it("does not clear boardForm data on handlePopupToggled", () => {
    wrapper.setData({
      boardForm: {
        id: "222",
        name: "tracker",
        description: "tracker board"
      }
    })
    wrapper.vm.handlePopupToggled(true)
    expect(wrapper.vm.boardForm.id).toBe("222")
    expect(wrapper.vm.boardForm.name).toBe("tracker")
    expect(wrapper.vm.boardForm.description).toBe("tracker board")
  })

  it("listens for 'taskboard-editing' on event bus", () => {
    Bus.$emit("taskboard-editing", {
      id: "222",
      name: "tracker",
      description: "tracker board"
    })

    expect(Bus.$on).toHaveBeenCalledWith("taskboard-editing", wrapper.vm.handleTaskBoardEditing)
  })

  it("Heading property returns 'Create new board' if creating a new board", () => {
    expect(wrapper.vm.heading).toBe("Create new board")
  })

  it("Heading property returns 'Update board information' if editing existing board", () => {
    wrapper.setData({
      boardForm: {
        id: 222
      }
    })

    expect(wrapper.vm.heading).toBe("Update board information")
  })

  it("saveTaskBoard action is called on handleSaveBoard", async () => {
    const boardForm = {
      id: "222",
      name: "tracker",
      description: "tracker board"
    }

    wrapper.vm.$validator.validateAll = jest.fn(() => Promise.resolve(true))
    wrapper.vm.handleTaskBoardEditing(boardForm)
    wrapper.vm.handleSaveBoard()
    await flushPromises()

    expect(wrapper.vm.$validator.validateAll).toHaveBeenCalled()

    expect($store.dispatch).toHaveBeenCalledWith("saveTaskBoard", {
      id: boardForm.id,
      name: boardForm.name,
      description: boardForm.description
    })
  })
})
