module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'MD@H Client Interface',
    themeColor: '#f79421',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      short_name: 'MD@H',
      start_url: '/'
    },
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  }
}