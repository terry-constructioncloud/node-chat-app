const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
app.use(express.static(publicPath));
app.listen(3000, () => {
    console.log(`app is running on ${port}`);
});
