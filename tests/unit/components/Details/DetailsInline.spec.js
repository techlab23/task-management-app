import DetailsInline from "@/components/Details/DetailsInline"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"

describe("DetailsInline.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DetailsInline, {
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
