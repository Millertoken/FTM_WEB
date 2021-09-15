import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {},
  mfsu: {},
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
  base: '/docs/',
  publicPath: '/static/',
  hash: true,
  history: {
    type: 'hash',
  },
});