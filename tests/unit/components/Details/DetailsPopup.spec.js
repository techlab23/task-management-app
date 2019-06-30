import DetailsPopup from "@/components/Details/DetailsPopup"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"

describe("DetailsPopup.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DetailsPopup, {
      mocks: {},
      stubs: {}
    })
  })

  it("Open dropdown", () => {
    wrapper.vm.open()
    expect(
      wrapper
        .find("details")
        .html()
        .includes("open")
    ).toBe(true)
  })

  it("Close dropdown", () => {
    wrapper.vm.close()

    expect(
      wrapper
        .find("details")
        .html()
        .includes("open")
    ).toBe(false)
  })

  it("toggle check - open", () => {
    wrapper.vm.open()
    wrapper.find("details").trigger("toggle")
    expect(wrapper.emitted("popup-toggled")).toBeTruthy()
  })

  it("toggle check - close", () => {
    wrapper.vm.close()
    wrapper.find("details").trigger("toggle")
    expect(wrapper.emitted("popup-toggled")).toBeTruthy()
  })
})
