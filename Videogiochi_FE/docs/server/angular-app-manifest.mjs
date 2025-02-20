
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/EsercizioVideogiochi/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/EsercizioVideogiochi"
  },
  {
    "renderMode": 2,
    "route": "/EsercizioVideogiochi/auth"
  },
  {
    "renderMode": 2,
    "route": "/EsercizioVideogiochi/categorie"
  },
  {
    "renderMode": 2,
    "route": "/EsercizioVideogiochi/piattaforme"
  },
  {
    "renderMode": 2,
    "route": "/EsercizioVideogiochi/casa-di-sviluppo"
  },
  {
    "renderMode": 2,
    "route": "/EsercizioVideogiochi/videogiochi"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5095, hash: 'd5275f24f374fa0b7fc595ad6c2c483a03fcac3d650d4c04ce57b42a6f688890', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1084, hash: '8ef652964c04a54feeff903c086f8a0d10e665bd784e8ee77cfe1bbf0ec0c2f7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'auth/index.html': {size: 17171, hash: '04f9a72b99c97a59827457734fb564effddc5243ae53af6e0f4d997d69531e23', text: () => import('./assets-chunks/auth_index_html.mjs').then(m => m.default)},
    'index.html': {size: 5661547, hash: 'd210503d72d5f6e2fff25f6831cf3698e7ebe3b563c2685fe56a529efbaf1097', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'categorie/index.html': {size: 17171, hash: '04f9a72b99c97a59827457734fb564effddc5243ae53af6e0f4d997d69531e23', text: () => import('./assets-chunks/categorie_index_html.mjs').then(m => m.default)},
    'casa-di-sviluppo/index.html': {size: 17171, hash: '04f9a72b99c97a59827457734fb564effddc5243ae53af6e0f4d997d69531e23', text: () => import('./assets-chunks/casa-di-sviluppo_index_html.mjs').then(m => m.default)},
    'videogiochi/index.html': {size: 17171, hash: '4ffa24e9d3a27f2f5bbd713d0c3cfac247290af8015c23c2bd4be8ad7c6625e2', text: () => import('./assets-chunks/videogiochi_index_html.mjs').then(m => m.default)},
    'piattaforme/index.html': {size: 17171, hash: '04f9a72b99c97a59827457734fb564effddc5243ae53af6e0f4d997d69531e23', text: () => import('./assets-chunks/piattaforme_index_html.mjs').then(m => m.default)},
    'styles.css': {size: 333704, hash: 'CmhtiSaacs4', text: () => import('./assets-chunks/styles_css.mjs').then(m => m.default)}
  },
};
