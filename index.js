"use strict";
const m3u8stream = require('m3u8stream');
const ytsr = require("ytsr");
const ytpl = require("ytpl");
const miniget = require("miniget");
const express = require("express");
const ejs = require("ejs");
const app = express();
const axios = require('axios');
const fs = require('fs');
const { https } = require('follow-redirects');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jp = require('jsonpath');
const path = require('path');
const bodyParser = require('body-parser');
const { URL } = require('url');
const bcrypt = require('bcrypt');
const http = require('http');

const limit = process.env.LIMIT || 50;

const user_agent = process.env.USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36";

//レギュラー
app.get('/w/:id/5.pdf', async (req, res) => {
  const videoId = req.params.id;
    let cookies = parseCookies(req);
    let wakames = cookies.wakametubeumekomi === 'true';
    if (wakames) {
    res.redirect(`/umekomi/${videoId}`);
    }
    try {
        const response = await axios.get(`https://ipad4610-mywakame.glitch.me/api/${videoId}?token=wakameoishi`);
        const videoData = response.data;
        console.log(videoData);

        res.render('Yukiyoutube-mod', { videoData, videoId });
  } catch (error) {
        res.status(500).render('matte', { 
      videoId, 
      error: '動画を取得できません', 
      details: error.message 
    });
  }
});

//urlでYouTube動画を探す
app.get("/home.pdf",(req, res) => {
  res.render("../index.html")
})


const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is now listening on port", listener.address().port);
});

process.on("unhandledRejection", console.error);
