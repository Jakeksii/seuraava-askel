import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import EventPage from "./pages/Event";
import IndexPage from "./pages/Index";

const loading = (<main aria-busy style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center' }} ><CircularProgress sx={{ alignSelf: 'center' }} /></main>)

export default function Router() {

    const routes = useRoutes([
        {
            element: (
                <AppLayout>
                    <Suspense fallback={loading}>
                        <Outlet />
                    </Suspense>
                </AppLayout>
            ),
            children: [
                { element: <IndexPage />, index: true },
                { path: '/:organization_name/:event_id', element: <EventPage /> },
            ]
        },
        { path: '*', element: <Navigate to="/" replace /> }
    ]);

    return routes;
}
