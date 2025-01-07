const {URL} = require("../models/url");
const shortid = require("shortid");
const geoip = require('geoip-lite');
const useragent = require('useragent');
const path = require('path');

const handleGenerateShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required!!!" });
  }

  try {
    let shortId1;
    let isDuplicate = true;

    while (isDuplicate) {
      shortId1 = shortid.generate();
      console.log("Generated shortId:", shortId1);

      if (!shortId1) {
        throw new Error("shortId generation failed");
      }

      const existingURL = await URL.findOne({ shortId: shortId1 });
      if (!existingURL) {
        isDuplicate = false;
      }
    }
    
    try {
      console.log(req.user.id);
      let newURL = new URL({
        shortId: shortId1,
        redirectURL: body.url,
        createdBy: req.user.id,
        visitHistory: [],
      });
      
      newURL.save().then(() => {
        console.log("saved");
      })
    } catch (error) {
      console.error("Error creating short URL:", error, newURL);
    }

    res.render('home', {id: shortId1})
  } catch (error) {
    console.error("Error creating short URL:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the short URL." });
  }
};

function getLocation(ip) {
  const dataPath = path.join(__dirname, 'data');
  geoip.reloadDataSync(dataPath);
  const geo = geoip.lookup(ip);
  return geo ? { country: geo.country, city: geo.city } : { country: 'Unknown', city: 'Unknown' };
}

function getDevice(userAgentString) {
  const agent = useragent.parse(userAgentString);
  if (agent.device.family === 'iPhone' || agent.device.family === 'Android') {
    return 'Mobile';
  } else if (agent.device.family === 'iPad') {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}

const handleGetIdRequest = async (req, res) => {
  const id = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId: id,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
          location: getLocation(req.ip),
          device: getDevice(req.headers['user-agent']),
          referrer: req.get('Referrer') || 'Direct'
        },
      },
    }
  );
    
  if (!entry) {
    res.status(404).json({ msg: "No link found!!!" });
  }

  const redirectUrl = entry.redirectURL.startsWith('http') ? entry.redirectURL : 'http://' + entry.redirectURL;

  res.redirect(redirectUrl);
};

const handleGetAnalyticsReq = async (req, res) => {
  const shortId = req.params.shortId;
  const user = await URL.findOne({ shortId });
  if (!user) res.status(404).json({ msg: "Link Not Found!!!" });
  res.json({
    totalClicks: user.visitHistory.length,
    analytics: user.visitHistory,
  });
};

module.exports = {
  handleGenerateShortURL,
  handleGetIdRequest,
  handleGetAnalyticsReq,
};
