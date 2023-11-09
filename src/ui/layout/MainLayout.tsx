import { Outlet } from "react-router-dom";
import Header from "@/ui/containers/Header";
import { Suspense } from "react";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
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
