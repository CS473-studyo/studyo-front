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
  // assetPrefix: '/studyo-front/',
  basePath: '/studyo-front',
};
