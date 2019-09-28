import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../pages/home';
import Recommend from '../pages/recommend';
import Singers from '../pages/singers';
import Rank from '../pages/rank';
import Album from '../pages/album';

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
        component: Singers
      },
      {
        path: '/rank',
        component: Rank
      }
    ]
  }
];
