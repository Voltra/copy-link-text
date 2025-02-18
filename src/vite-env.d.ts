/// <reference types="vite/client" />

// https://vuejs.github.io/vetur/guide/setup.html#typescript
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<
		Record<string, unknown>,
		Record<string, unknown>,
		unknown
	>;
	export default component;
}
