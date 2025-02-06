import browser from "webextension-polyfill";

// We save the unique (and extension-scoped) menu ID
// so that we're able to identify it in event
// listeners as well as being able to
// update it later on.
let menuId = "copy-link-text__copyLinkText" as string | number;

// We create the menu item as soon as the extension boots
// that way it's available throughout the lifetime
// of the browser window.
menuId = browser.menus.create({
	id: menuId as string,
	title: browser.i18n.getMessage("menuTitle"),
	contexts: ["link"],
	icons: {
		"16": "/assets/copy-link-text.svg",
		"48": "/assets/copy-link-text.svg",
		"64": "/assets/copy-link-text.svg",
		"96": "/assets/copy-link-text.svg",
		"128": "/assets/copy-link-text.svg",
	},
});

// Everytime a menu (item) is shown we update ours
// so that changes in active/current locale
// are properly detected.
browser.menus.onShown.addListener(info => {
	if (!info.menuIds.includes(menuId)) {
		return;
	}

	browser.menus
		.update(menuId, {
			title: browser.i18n.getMessage("menuTitle"),
		})
		.catch((err: unknown) => {
			console.error(
				"[copy-link-text] Failed to update the menu item's title",
			);
			console.error("[copy-link-text]", err);
		});
});

// When clicking on our menu (item) we want the
// target link's text to be copied to the
// user's clipboard. As such we use
// the browser's Clipboard API
// instead of the extensions'
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
