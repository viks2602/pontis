import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Loader } from "../components";
import { LoginPage, Layout, DetailsPage } from "../pages";
import ConfigurationsWrapper from "../pages/dashboards/configurationPages";
import DetailsWrapper from "../pages/dashboards/dashboardDetails";
import AddNewDashboard from "../pages/dashboards/configurationPages/dashboardSettings/addNew/AddNewDashboard";
import CertificatesPage from "../pages/dashboards/configurationPages/certificates/CertificatesPage";
import SettingsPage from "../pages/dashboards/configurationPages/settings/SettingsPage";
import PreviewDashboard from "../pages/dashboards/configurationPages/dashboardSettings/previewDashboard/PreviewDashboard";
import DetailServer from "../pages/dashboards/configurationPages/servers/DetailServer";
import EditDashboard from "../pages/dashboards/configurationPages/dashboardSettings/editDashboard/EditDashboard";
import NewMetaDataPage from "../pages/dashboards/configurationPages/settings/NewMetaDataPage";

const Iam = lazy(() => import("../pages/dashboards/Iam/Iam"));       
const Alerts = lazy(() => import("../pages/dashboards/configurationPages/alerts/Alerts"));       
const ServersPage = lazy(() => import("../pages/dashboards/configurationPages/servers/ServersPage"));       
const DashboardSettings = lazy(() => import("../pages/dashboards/configurationPages/dashboardSettings/DashboardSettings"));       
const Users = lazy(() => import("../pages/dashboards/configurationPages/users/UsersPage"));       
const NewServer = lazy(() => import("../pages/dashboards/configurationPages/servers/NewServer"));       
const DashboardsList = lazy(() => import("../pages/dashboards/configurationPages/dashboardSettings/dashboardList/DashboardsList"));       

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="dashboard" element={<Layout />}>
        <Route index path=":dashboardId" element={<Suspense fallback={<Loader/>}>
          <Iam />
        </Suspense>} />

        <Route path="details" element={<DetailsWrapper/>}>
          <Route path=":detailDashboardId" element={<Suspense fallback={<Loader/>}> <DetailsPage /> </Suspense>} />
        </Route>

        <Route path="configuration" element={<ConfigurationsWrapper/>}>
          <Route path="alerts" element={<Suspense fallback={<Loader/>}> <Alerts /> </Suspense>} />
          <Route path="servers" element={<Suspense fallback={<Loader/>}> <ServersPage /> </Suspense>} />
          <Route path="servers/server" element={<Suspense fallback={<Loader/>}> <NewServer /> </Suspense>} />
          <Route path="servers/server/details" element={<Suspense fallback={<Loader/>}> <DetailServer /> </Suspense>} />
          <Route path="dashboards" element={<Suspense fallback={<Loader/>}> <DashboardSettings /> </Suspense>} >
            <Route index path="list" element={<Suspense fallback={<Loader/>}> <DashboardsList /> </Suspense>} />
            <Route path="add-new" element={<AddNewDashboard />} />
            <Route path="preview" element={<PreviewDashboard />} />
            <Route path="preview/:id" element={<PreviewDashboard />} />
            <Route path="edit-dashboard" element={<EditDashboard/>}/>
          </Route>
          <Route path="users" element={<Suspense fallback={<Loader/>}> <Users /> </Suspense>} />
          <Route path="certificates" element={<Suspense fallback={<Loader/>}> <CertificatesPage /> </Suspense>} />
          <Route path="settings" element={<Suspense fallback={<Loader/>}> <SettingsPage /> </Suspense>} />
          <Route path="settings/metadata" element={<Suspense fallback={<Loader/>}> <NewMetaDataPage /> </Suspense>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AllRoutes;
