module.exports = function(api) {
  api.cache(false);

  const presets = ['module:@react-native/babel-preset', '@babel/flow'];
  const plugins = [];

  return {
    presets,
    plugins,
    sourceMaps: true,
  };
};
