import { useMemo } from 'react';
import { usePathname } from '.';

// ----------------------------------------------------------------------

const titles = [
  { path: '/events', title: 'Tapahtumat' },
  { path: '/media', title: 'Media' },
  { path: '/organization', title: 'Organisaatio' },
  { path: '/organization/switch', title: 'Vaihda organisaatio' },
  { path: '/organization/new', title: 'Uusi organisaatio' },
  { path: '/statistics', title: 'Statistiikka' },
  { path: '/team&subscription', title: 'Tiimi & Tilaus' }
]

export function usePathtitle() {
  
  const pathname = usePathname()
  
  return useMemo(() => {
    const titleObj = titles.find(item => item.path === pathname)
    return titleObj ? titleObj.title : 'Ohjauspaneeli' // Default value
  }, [pathname]);

}
