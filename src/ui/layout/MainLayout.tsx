import { Outlet } from "react-router-dom";
import Header from "@/ui/containers/Header";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
};

export default MainLayout;
