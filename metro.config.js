const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const { transformer, resolver } = config;

resolver.assetExts = resolver.assetExts.filter((ext) => ext !== "svg");
resolver.sourceExts.push("svg");
transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

// @ alias 설정
config.resolver.extraNodeModules = {
  "@": path.resolve(__dirname),
};

config.watchFolders = [path.resolve(__dirname)];

module.exports = withNativeWind(config, { input: "./global.css" });
