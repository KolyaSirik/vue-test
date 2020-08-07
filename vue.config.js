module.exports = {
  runtimeCompiler: true,
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // настройки манифеста
    manifestOptions: {
      display: 'fullscreen',
      background_color: '#42B883'
      // ...другие настройки манифеста...
    },

    // настройка workbox-плагина
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      globDirectory: 'dist',
      globPatterns: [
        'favicon.ico',
        'index.html',
        '*.css',
        '*.js',
        'assets/**/*',
      ],
      // swSrc необходимо в режиме InjectManifest
      swSrc: 'sw.js',
      // ...другие настройки Workbox...
    },
  },
};
