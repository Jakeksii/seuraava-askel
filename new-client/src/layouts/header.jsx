import PropTypes from 'prop-types';
import EmblaCarousel from './EmblaCarousel';
import Nav from './nav';

// ----------------------------------------------------------------------

export default function Header() {

  return (
    <>
      <EmblaCarousel />
      <Nav />
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
