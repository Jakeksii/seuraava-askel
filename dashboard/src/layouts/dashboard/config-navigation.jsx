import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_round-dashboard'),
  },
  {
    title: 'tapahtumat',
    path: '/events',
    icon: icon('ic_events'),
  },
  {
    title: 'organisaatio',
    path: '/organization',
    icon: icon('ic_building-32-filled'),
  },
  {
    title: 'statistiikka',
    path: '/statistics',
    icon: icon('ic_analytics'),
  },
  {
    title: 'tiimi & tilaus',
    path: '/team&subscription',
    icon: icon('ic_people-12-filled'),
  },
];

export default navConfig;
