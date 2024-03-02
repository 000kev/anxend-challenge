/** @type {import('@remix-run/dev').AppConfig} */

export default {
  ignoredRouteFiles: ["**/*"],
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/", "/home.tsx", {index: true});
    })
  },
  tailwind: true,
  postcss: true,
  
}

