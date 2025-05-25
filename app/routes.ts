import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("/sign-in", "./routes/root/sign-in.tsx"),
  route("/api/create-trip", "./routes/api/create-trip.ts"),
  layout("./routes/admin/admin-layout.tsx", [
    route("dashboard", "./routes/admin/dashboard.tsx"),
    route("all-users", "./routes/admin/all-users.tsx"),
    route("trips", "./routes/admin/trips.tsx"),
    route("trips/create", "./routes/admin/create-trip.tsx"),
    route("trips/:tripId", "./routes/admin/trip-detail.tsx"),
  ]),
  layout("routes/root/page-layout.tsx", [index("routes/root/travel-page.tsx")]),
] satisfies RouteConfig;

// on the package.json file: because of the sentry integration which added values to the scripts, there where changes to the "dev" and "start" scripts:
// so i used cross-env The simplest and most reliable way to set environment variables in npm scripts across different operating systems (Windows, macOS, Linux) because i was getting errors when running the dev script on windows
// without cross-env i can use this crip below but only works on windows:
// "dev": "set NODE_OPTIONS=--import ./instrument.server.mjs && react-router dev", "start": "set NODE_OPTIONS=--import ./instrument.server.mjs && react-router-serve ./build/server/index.js",
