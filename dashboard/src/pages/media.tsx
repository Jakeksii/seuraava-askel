import { Helmet } from 'react-helmet-async';
import { MediaLibraryView } from 'src/sections/media/view';

// ----------------------------------------------------------------------

export default function StatisticsPage() {
  return (
    <>
      <Helmet>
        <title> Media </title>
      </Helmet>
      <MediaLibraryView />
    </>
  );
}