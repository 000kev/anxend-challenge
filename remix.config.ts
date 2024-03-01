/** @type {import('@remix-run/dev').AppConfig} */
export default {
  tailwind: true,
  postcss: true,
  async routes(defineRoutes)  {
    return defineRoutes((route) => {
      route("", "_index/home.tsx", {index: true});
      route("/", "_index/home.tsx", {index: true});
    })
  }
}

