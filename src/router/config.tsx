import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import About from "../pages/about/page";
import Courses from "../pages/courses/page";
import Blog from "../pages/blog/page";
import PostDetail from "../pages/blog/PostDetail";
import Events from "../pages/events/page";
import Terms from "../pages/terms/page";
import Login from "../pages/login/page";
import Dashboard from "../pages/dashboard/page";
import Contact from "../pages/contact/page";
import Booking from "../pages/booking/page";
import Admin from "../pages/admin/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/courses", element: <Courses /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <PostDetail /> },
  { path: "/events", element: <Events /> },
  { path: "/terms", element: <Terms /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/contact", element: <Contact /> },
  { path: "/booking/:courseId", element: <Booking /> },
  { path: "/admin", element: <Admin /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
