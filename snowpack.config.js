module.exports = {
  "mount": {
    "src": "/",
    "public": "/dist"
  },
  plugins: [
    [
      '@snowpack/plugin-sass',
      '@snowpack/plugin-babel',
      {
        "input": ['.js']
      }
    ],
  ],
};
