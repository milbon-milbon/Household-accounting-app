module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
