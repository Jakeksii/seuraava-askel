import PropTypes from 'prop-types';
import Header from './header';
import Main from './main';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {

  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};