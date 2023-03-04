import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	transformerAttributifyJsx,
	transformerDirectives,
	transformerCompileClass,
	TransformResult,
	transformerVariantGroup
} from 'unocss';

import presetFloe from 'floeui'

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons({
			scale: 1.3,
		}),
		presetAttributify(),
		presetFloe()
	],
	transformers: [
		// transformerAttributifyJsx(),
		transformerDirectives(),
		transformerVariantGroup(),
		transformerCompileClass()
	],
	safelist:[
		'modal-open'
	]

});