'use client';

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';
import dataProvider from '@refinedev/simple-rest';
import { ReactNode } from 'react';

interface RefineProviderProps {
  children: ReactNode;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export function RefineProvider({ children }: RefineProviderProps) {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      resources={[
        {
          name: 'projects',
          list: '/dashboard/projects',
          show: '/dashboard/projects/:id',
          create: '/dashboard/projects/create',
          edit: '/dashboard/projects/:id/edit',
          meta: {
            label: 'Projects',
          },
        },
        {
          name: 'content',
          list: '/dashboard/content',
          show: '/dashboard/content/:id',
          create: '/dashboard/content/create',
          edit: '/dashboard/content/:id/edit',
          meta: {
            label: 'Content',
          },
        },
        {
          name: 'partners',
          list: '/dashboard/partners',
          show: '/dashboard/partners/:id',
          create: '/dashboard/partners/create',
          edit: '/dashboard/partners/:id/edit',
          meta: {
            label: 'Partners',
          },
        },
        {
          name: 'campaigns',
          list: '/dashboard/campaigns',
          show: '/dashboard/campaigns/:id',
          create: '/dashboard/campaigns/create',
          edit: '/dashboard/campaigns/:id/edit',
          meta: {
            label: 'Campaigns',
          },
        },
      ]}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        disableTelemetry: true,
      }}
    >
      {children}
    </Refine>
  );
}
