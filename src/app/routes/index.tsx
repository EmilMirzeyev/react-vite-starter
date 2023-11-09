import { useRoutes } from "react-router-dom";
import NotFound from "@/ui/pages/common/NotFound";
import AuthProtectedRoute from "@/app/routes/auth-protected-route";
import MainLayout from "@/ui/layout/MainLayout";
import { lazy } from "react";
// import LoginPage from "@/ui/pages/auth/LoginPage";
// import PostsPage from "@/ui/pages/posts/PostsPage";
// import PostDetailsPage from "@/ui/pages/posts/details/PostDetailsPage";

const LoginPage = lazy(() => import("@/ui/pages/auth/LoginPage"));
const PostsPage = lazy(() => import("@/ui/pages/posts/PostsPage"));
const PostDetailsPage = lazy(() => import("@/ui/pages/posts/details/PostDetailsPage"));

// const LoginPage = lazyLoad("@/ui/pages/auth/LoginPage");
// const PostsPage = lazyLoad("@/ui/pages/posts/PostsPage");
// const PostDetailsPage = lazyLoad("@/ui/pages/posts/details/PostDetailsPage");

const AppRoutes = () => {
  const routesConfig = [
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
              path: "/posts/*",
              children: [
                {
                  index: true,
                  element: <PostsPage />
                },
                {
                  path: ":postId",
                  element: <PostDetailsPage />
                }
              ]
            }
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
