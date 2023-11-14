import { RouteObject, useRoutes } from "react-router-dom";
import { lazy } from "react";
import NotFound from "@/ui/pages/common/NotFound";
import AuthProtectedRoute from "@/app/routes/auth-protected-route";
import MainLayout from "@/ui/layout/MainLayout";

const LoginPage = lazy(() => import("@/ui/pages/auth/LoginPage"));
const PostsPage = lazy(() => import("@/ui/pages/posts/PostsPage"));
const PostDetailsPage = lazy(
  () => import("@/ui/pages/posts/details/PostDetailsPage")
);
const HomePage = lazy(() => import("@/ui/pages/home/HomePage"));



const AppRoutes = () => {
  const routesConfig: RouteObject[] = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      element: <AuthProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/posts/*",
              children: [
                {
                  index: true,
                  element: <PostsPage />,
                },
                {
                  path: ":postId",
                  element: <PostDetailsPage />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const routes = useRoutes(routesConfig);

  return routes;
};

export default AppRoutes;
