import TaskListActions from "@/components/Lists/TaskListActions.vue"
import { mount, createLocalVue } from "@vue/test-utils"
import { Bus } from "@/utils/bus"

Bus.$emit = jest.fn()

describe("TaskListActions.vue", () => {
  let wrapper
  let propsData

  beforeEach(() => {
    propsData = {
      board: { id: "222" },
      list: { id: "222-2" }
    }

    wrapper = mount(TaskListActions, {
      propsData: { board: propsData.board, list: propsData.list },
      mocks: {},
      stubs: {}
    })
  })

  it("tasklist-editing event is triggered", () => {
    wrapper.vm.showListEditPopup()
    expect(Bus.$emit).toHaveBeenCalledWith("tasklist-editing", wrapper.vm.list)
  })

  it("tasklist-archiving event is triggered", () => {
    wrapper.vm.showArchiveListPopup()
    expect(Bus.$emit).toHaveBeenCalledWith("tasklist-archiving", { board: wrapper.vm.board, list: wrapper.vm.list })
  })
})
