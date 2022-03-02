// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [
      ...process.env.RN_SRC_EXT.split(",").concat(config.resolver.sourceExts),
      "cjs",
    ]
  : [...config.resolver.sourceExts, "cjs"];

module.exports = config;
