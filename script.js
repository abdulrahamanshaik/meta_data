// const unshort = require("url-unshorten");
// const getMetaData = require("metadata-scraper");

// unshort("https://www.youtube.com/watch?v=tWy7b91qMDk&ab_channel=pipedream")
//   .then(async (res) => {
//     const data = await getMetaData(res.unshorten);
//     console.log({
//       title: data.title,
//       description: data.description,
//       url: data.url,
//       provider: data.provider,
//     });
//   })
//   .catch(console.log);
const express = require("express");
const unshort = require("url-unshorten");
const getMetaData = require("metadata-scraper");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: "Missing 'url' parameter" });
    return;
  }
  var dd = { result: "none" };

  const un = await unshort(url)
    .then(async (res) => {
      const data = await getMetaData(res.unshorten);
      dd = {
        title: data.title,
        description: data.description,
        url: data.url,
        provider: data.provider,
      };
    })
    .catch(console.log);
  await res.json(dd);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
