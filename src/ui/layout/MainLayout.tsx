import { Outlet } from "react-router-dom";
import Header from "@/ui/containers/Header";
import { Suspense } from "react";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-rows-[56px_1fr_56px]">
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen">
            <h1>Loading...</h1>
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <h1>Footer</h1>
    </div>
  );
};

export default MainLayout;
