import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/settings/view';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> Settings | SE-AS </title>
      </Helmet>
      <UserView />
    </>
  );
}