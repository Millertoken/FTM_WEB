import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  // layout: {},
  mfsu: {}, 
  title: 'RatiryZone',
  favicon: '/assets/rarity_favicon.ico',
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: 'home/MainPage', component: '@/pages/home/main/MainPage' },
        { path: 'home/HeroList', component: '@/pages/home/hero/HeroList' },
        { path: 'home/HeroCreate', component: '@/pages/home/hero/HeroCreate' },
      ],
    },
  ],
  fastRefresh: {},
  base: '/',
  publicPath: '/',
  hash: true,
  history: {
    type: 'hash',
  },
});
