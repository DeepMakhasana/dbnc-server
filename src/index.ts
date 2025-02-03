// Import required modules
// import ServerlessHttp from "serverless-http";
import app from "./app";
import config from "./config";

// Start server
// if (config.port === "development") {
const PORT = config.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// }
// export const handler = ServerlessHttp(app);
