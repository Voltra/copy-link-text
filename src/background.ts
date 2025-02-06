import browser from "webextension-polyfill";

const menuId = "copy-link-text__copyLinkText";

browser.menus.create({
	id: menuId,
	title: "Copy link's text",
	contexts: ["link"],
	icons: {
		"16": "/assets/copy-link-text.svg",
		"48": "/assets/copy-link-text.svg",
		"64": "/assets/copy-link-text.svg",
		"96": "/assets/copy-link-text.svg",
		"128": "/assets/copy-link-text.svg",
	},
});

browser.menus.onClicked.addListener(info => {
	if (info.menuItemId !== menuId || !info.linkText) {
		return;
	}

	navigator.clipboard.writeText(info.linkText).catch((err: unknown) => {
		console.error("[copy-link-text] Failed to copy to clipboard: ", {
			text: info.linkText,
			url: info.linkUrl,
		});

		console.error("[copy-link-text]", err);
	});
});
