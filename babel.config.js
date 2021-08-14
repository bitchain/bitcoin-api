module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    ["module-resolver", {
      alias: {
        "@repositories": "./src/repositories",
        "@modules": "./src/modules",
        "@shared": "./src/shared",
        "@entities": "./src/entities",
        "@config": "./src/config",
        "@errors": "./src/errors",
        "@http": "./src/http"
      }
    }],
    "transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true, }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
