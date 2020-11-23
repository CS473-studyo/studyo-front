const withStyles = require('@webdeb/next-styles');

module.exports = withStyles({
  sass: true, // use .scss files
  modules: true, // style.(m|module).css & style.(m|module).scss for module files
});

//  `next.config.js` 작성하기
module.exports = {
  webpack(config) {
    config.module.rules.push({
      // 웹팩설정에 로더 추가함
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    BASE_URL: 'http://localhost:8080',
  },
};
