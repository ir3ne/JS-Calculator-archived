module.exports = {
  "mount": {
    "src": "/dist",
    "public": "/"
  },
  plugins: [
    [
      '@snowpack/plugin-sass',
      {
        /* see options below */
      },
    ],
  ],
};
