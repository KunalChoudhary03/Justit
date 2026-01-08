require('dotenv').config();
const app = require('./src/app.js');
const connectDb = require('./src/db/db.js');
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const url = 'https://justit-yyzo.onrender.com/';
const interval = 30000;

function reloadWebsite() {
  axios.get(url)
    .then(() => console.log("Website reloaded"))
    .catch(err => console.error("Ping error:", err.message));
}

setInterval(reloadWebsite, interval);

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("DB connection failed", err);
  }
})();
