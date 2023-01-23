import { SelectedTokenType } from "contexts";
import { MainLayout } from "layouts";
import { Footer, Header } from "layouts/MainLayout/components";
import HomePage from "pages/HomePage";
import ProfilePage from "pages/ProfilePage";
import TransferPage from "pages/TransferPage";
import { Route, Routes, Navigate } from "react-router-dom";

export const renderRoutes = (routes = []) => (
  <Routes>
    <Route
      path="/"
      element={
        <MainLayout>
          <HomePage />
        </MainLayout>
      }
    />
    <Route
      path="/transfer/:tokenType/:exId/:networkId"
      element={
        <MainLayout>
          <TransferPage />
        </MainLayout>
      }
    />
    <Route
      path="/profile"
      element={
        <div className="layout__main">
          <Header />
          <div className="py-4 md:py-12 lg:py-[80px] px-2 mx-auto max-w-6xl w-full">
            <main>
              <SelectedTokenType>
                <ProfilePage />
              </SelectedTokenType>
            </main>
          </div>
          <Footer />
        </div>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
