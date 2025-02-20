
export default {
  basePath: '/EsercizioVideogiochi',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
