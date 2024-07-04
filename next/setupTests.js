// setupTests.js
// require("@testing-library/jest-dom");
// const fetch = require("node-fetch");
import "@testing-library/jest-dom";
import fetch from "node-fetch";
global.fetch = fetch;
