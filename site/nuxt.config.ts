import { definePreset } from '@primeuix/styled';
import Aura from '@primevue/themes/aura';

const Noir = definePreset(Aura, {
	semantic: {
		primary: {
			50: '{zinc.50}',
			100: '{zinc.100}',
			200: '{zinc.200}',
			300: '{zinc.300}',
			400: '{zinc.400}',
			500: '{zinc.500}',
			600: '{zinc.600}',
			700: '{zinc.700}',
			800: '{zinc.800}',
			900: '{zinc.900}',
			950: '{zinc.950}'
		},
		colorScheme: {
			light: {
				primary: {
					color: '{zinc.950}',
					inverseColor: '#ffffff',
					hoverColor: '{zinc.900}',
					activeColor: '{zinc.800}'
				},
				highlight: {
					background: '{zinc.950}',
					focusBackground: '{zinc.700}',
					color: '#ffffff',
					focusColor: '#ffffff'
				}
			},
			dark: {
				primary: {
					color: '{zinc.50}',
					inverseColor: '{zinc.950}',
					hoverColor: '{zinc.100}',
					activeColor: '{zinc.200}'
				},
				highlight: {
					background: 'rgba(250, 250, 250, .16)',
					focusBackground: 'rgba(250, 250, 250, .24)',
					color: 'rgba(255,255,255,.87)',
					focusColor: 'rgba(255,255,255,.87)'
				}
			}
		}
	}
});

export default defineNuxtConfig({
	app: {
		rootId: 'dsbox-app'
	},
	css: ['@/assets/less/base.less'],
	vite: {
		css: {
			preprocessorOptions: {
				less: {
					// Injects into every LESS file processed by Vite
					additionalData: `@import "@/assets/less/base.less";`
				}
			}
		}
	},
	devtools: { enabled: true },
	primevue: {
		options: {
			theme: {
				preset: Noir
			}
		},
		autoImport: true
	},
	modules: [
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@primevue/nuxt-module'
	],
	devServer: {
		host: '0.0.0.0',
		port: 3500
	},
	runtimeConfig: {
		public: {}
	},
	ssr: false,
	hooks: {
	    'vite:extendConfig': (config) => {
	      if (typeof config.server!.hmr === 'object') {
	        config.server!.hmr.protocol = 'wss';
	      }
	    },
	},
	routeRules: {
		'/': {
			appMiddleware: {
				auth: true
			}
		},
		'/login': {
			appMiddleware: {
				auth: false
			}
		},
		'/**': {
			appMiddleware: ['auth']
		}
	},
	compatibilityDate: '2024-07-12'
});

