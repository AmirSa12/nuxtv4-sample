// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      fakeStoreApiBase: 'https://fakestoreapi.com',
    },
  },
  $production: {
    routeRules: {
      '/': { swr: 3600 },
      '/products/**': { swr: 3600 },
      '/api/products': { cache: { maxAge: 60 * 60 } },
      '/api/products/**': { cache: { maxAge: 60 * 60 } },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
