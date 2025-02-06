import { shallowMount } from "@vue/test-utils";
import OptionsScreen from "../src/options/OptionsScreen.vue";
import browser from "webextension-polyfill";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

describe("optionsScreen.vue", () => {
	beforeAll(() => {
		vi.mock("webextension-polyfill", () => ({
			default: {
				runtime: {
					sendMessage: vi.fn(),
				},
			},
		}));
	});

	afterAll(() => {
		vi.clearAllMocks();
	});

	it("renders options page when passed", () => {
		const wrapper = shallowMount(OptionsScreen, {});
		expect(wrapper.text()).toMatch("Options Page");
		expect(browser.runtime.sendMessage).toHaveBeenCalled();
	});
});
