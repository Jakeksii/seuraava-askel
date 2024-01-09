import { Helmet } from 'react-helmet-async';

import { StatisticsView } from 'src/sections/statistics/view';

// ----------------------------------------------------------------------

export default function StatisticsPage() {
  return (
    <>
      <Helmet>
        <title> Statistiikka | SE-AS </title>
      </Helmet>
      <StatisticsView />
    </>
  );
}