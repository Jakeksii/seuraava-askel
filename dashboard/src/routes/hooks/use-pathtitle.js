import { useMemo } from 'react';
import { usePathname } from '.';

// ----------------------------------------------------------------------

const titles = [
  { path: '/events', title: 'Tapahtumat' },
  { path: '/events/:_id', title: 'Tapahtuma' },
  { path: '/events/:_id/edit', title: 'Muokkaa tapahtumaa' },
  { path: '/media', title: 'Media' },
  { path: '/organization', title: 'Organisaatio' },
  { path: '/organization/switch', title: 'Vaihda organisaatio' },
  { path: '/organization/new', title: 'Uusi organisaatio' },
  { path: '/statistics', title: 'Statistiikka' },
  { path: '/team&subscription', title: 'Tiimi & Tilaus' }
];

export function usePathtitle() {
  const pathname = usePathname();

  return useMemo(() => {
    // Find the title object that matches the current pathname or dynamic route
    const titleObj = titles.find(item => {
      const pathParts = item.path.split('/').filter(part => part !== '');
      const pathnameParts = pathname.split('/').filter(part => part !== '');
      
      if (pathParts.length !== pathnameParts.length) return false;
      
      for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i] !== pathnameParts[i] && !pathParts[i].startsWith(':')) {
          return false;
        }
      }
      
      return true;
    });
    
    return titleObj ? titleObj.title : 'Ohjauspaneeli'; // Default value
  }, [pathname]);
}
