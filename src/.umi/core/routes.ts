// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/qingyunxiaofan/Documents/work/coin/rarity_web/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index')}),
    "routes": [
      {
        "path": "/home/MainPage",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home__main__MainPage' */'@/pages/home/main/MainPage')}),
        "exact": true
      },
      {
        "path": "/home/HeroList",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home__hero__HeroList' */'@/pages/home/hero/HeroList')}),
        "exact": true
      },
      {
        "path": "/home/HeroCreate",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home__hero__HeroCreate' */'@/pages/home/hero/HeroCreate')}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
