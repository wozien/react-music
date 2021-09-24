import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import Home from '@/pages/home/Home';

const Recommend = lazy(() => import('../pages/recommend/Recommend'));
const Singers = lazy(() => import('../pages/singers/Singers'));
const Rank = lazy(() => import('../pages/rank/Rank'));
const Album = lazy(() => import('../pages/album/Album'));
const Singer = lazy(() => import('../pages/singer/Singer'));
const Search = lazy(() => import('../pages/search/Search'));

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to="/recommend" />
      },
      {
        path: '/recommend',
        component: SuspenseComponent(Recommend),
        routes: [
          {
            path: '/recommend/:id',
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: '/singers',
        component: SuspenseComponent(Singers),
        routes: [
          {
            path: '/singers/:id',
            component: SuspenseComponent(Singer)
          }
        ]
      },
      {
        path: '/rank',
        component: SuspenseComponent(Rank),
        routes: [
          {
            path: '/rank/:id',
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: '/search',
        component: SuspenseComponent(Search),
        exact: true
      },
      {
        path: '/album/:id',
        component: SuspenseComponent(Album),
        exact: true
      }
    ]
  }
];
