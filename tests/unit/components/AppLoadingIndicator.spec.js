import AppLoadingIndicator from "@/components/AppLoadingIndicator.vue"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import Vuex from "vuex"
const localVue = createLocalVue()
localVue.use(Vuex)

describe("AppLoadingIndicator.vue", () => {
  let $store
  let wrapper

  it("Displays loading animation if isLoading set to true", () => {
    $store = {
      getters: {
        isLoading: true
      }
    }
    wrapper = shallowMount(AppLoadingIndicator, {
      mocks: { $store }
    })
    expect(wrapper.text()).toContain("Loading...")
  })

  it("hides loading animation if isLoading set to false", () => {
    $store = {
      getters: {
        isLoading: false
      }
    }
    wrapper = shallowMount(AppLoadingIndicator, {
      mocks: { $store }
    })
    expect(wrapper.text()).not.toContain("Loading...")
  })
})
