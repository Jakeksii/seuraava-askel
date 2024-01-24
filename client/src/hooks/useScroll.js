import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function useScrollToId(id) {
  const appBarRef = useRef(document.getElementById(id))

  useEffect(() => {
    appBarRef?.current?.scrollIntoView({ block: 'start', inline: 'nearest' })
  }, [])

  return null
}