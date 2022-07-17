const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`App currently on PORT ${PORT}`)
});

module.exports = app;
