const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Todo-List API");
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})