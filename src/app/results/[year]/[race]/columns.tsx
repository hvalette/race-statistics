'use client';

import { Result } from '@/lib/results';
import { getFlagEmoji } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: 'rank',
    header: '',
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'bibNumber',
    header: 'Dossard',
  },
  {
    accessorKey: 'name',
    header: 'Nom',
    accessorFn: ({ name, countryCode }) =>
      `${getFlagEmoji(countryCode?.slice(0, 2) ?? '')} ${name}`,
  },
  {
    accessorKey: 'category.name',
    header: 'Catégorie',
    enableGlobalFilter: false,
    filterFn: 'arrIncludesSome',
  },
  {
    accessorKey: 'category.position',
    header: 'Classement',
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'time',
    header: 'Temps',
    cell: ({ row }) =>
      Intl.DateTimeFormat('fr-FR', {
        timeStyle: 'medium',
        hour12: false,
      }).format(row.getValue('time')),
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'gender.category',
    enableGlobalFilter: false,
  },
];
