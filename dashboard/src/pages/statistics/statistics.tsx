import { Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';

import { StatisticsView } from 'src/sections/statistics/view';

// ----------------------------------------------------------------------

export default function StatisticsPage() {
  return (
    <>
      <Helmet>
        <title> Statistiikka </title>
      </Helmet>

      <ErrorBoundary>
        <StatisticsView />
      </ErrorBoundary>
    </>
  );
}