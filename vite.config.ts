import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import'
import unocss from 'unocss/vite'

export default defineConfig({
	plugins: [
		dynamicImport(),
		unocss(),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
