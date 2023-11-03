import { useRoutes } from "react-router-dom";
import NotFound from "@/ui/pages/common/NotFound";
import AuthProtectedRoute from "@/app/routes/auth-protected-route";
import MainLayout from "@/ui/layout/MainLayout";
import LoginPage from "@/ui/pages/auth/LoginPage";
import PostsPage from "@/ui/pages/posts/PostsPage";
import PostDetailsPage from "@/ui/pages/posts/details/PostDetailsPage";

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
