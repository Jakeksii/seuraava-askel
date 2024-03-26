import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import { MediaLibraryView } from 'src/sections/media/view';

// ----------------------------------------------------------------------

export default function StatisticsPage() {
  return (
    <>
      <Helmet>
        <title> Media </title>
      </Helmet>
      
      <ErrorBoundary>
        <MediaLibraryView />
      </ErrorBoundary>
    </>
  );
}