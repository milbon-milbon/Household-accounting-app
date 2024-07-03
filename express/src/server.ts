// import http from "http";
import app from "./app";
import logger from "./context/logger";

const port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.debug(`Server running on http://localhost:${port}`);
  });
}

export default app;
