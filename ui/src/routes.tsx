import { MainLayout } from "layouts";
import HomePage from "pages/HomePage";
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
      path="/transfer"
      element={
        <MainLayout>
          <TransferPage />
        </MainLayout>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
