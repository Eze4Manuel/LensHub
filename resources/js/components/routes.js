/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import RentGadget from "./views/RentGadget/RentGadget.js";
import SearchGadget from "./views/SearchGadget/SearchGadget.js";
import Logout from "./views/Logout/Logout.js";
import Maps from "./views/Maps/Maps.js";
import Stats from "./views/Stats/Stats.js";
 // core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
     icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
     icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/rentgadget",
    name: "Rent Gadget",
    icon: "content_paste",
    component: RentGadget,
    layout: "/admin"
  },
  // {
  //   path: "/searchgadget",
  //   name: "Search Gadget",
  //   icon: LibraryBooks,
  //   component: SearchGadget,
  //   layout: "/admin"
  // },

  // {
  //   path: "/maps",
  //   name: "Maps",
  //    icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/stats",
    name: "Notifications",
     icon: Notifications,
    component: Stats,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: BubbleChart,
    component: Logout,
    layout: "/admin"
  },


];

export default dashboardRoutes;
