import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '@/pages/home/Home';
import Recommend from '../pages/recommend/Recommend';
import Singers from '../pages/singers/Singers';
import Rank from '../pages/rank/Rank';
import Album from '../pages/album/Album';
import Singer from '../pages/singer/Singer';
import Search from '../pages/search/Search';

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
        component: Recommend,
        routes: [
          {
            path: '/recommend/:id',
            component: Album
          }
        ]
      },
      {
        path: '/singers',
        component: Singers,
        routes: [
          {
            path: '/singers/:id',
            component: Singer
          }
        ]
      },
      {
        path: '/rank',
        component: Rank,
        routes: [
          {
            path: '/rank/:id',
            component: Album
          }
        ]
      },
      {
        path: '/search',
        component: Search,
        exact: true
      },
      {
        path: '/album/:id',
        component: Album,
        exact: true
      }
    ]
  }
];
