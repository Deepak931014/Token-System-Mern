const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const cors = require('cors');

const app = express();

/////// Database //////////////////
mongoose.connect("mongodb+srv://Deepak25:gta5mods@cluster0.bk2xyo5.mongodb.net/token-server?retryWrites=true&w=majority", {
    useNewUrlParser: true,
}).then(() => {
    console.log('Database connected');
}).catch(err => {
    console.error('Database connection error:', err);
});

const TokenSchema = new mongoose.Schema({
    userName: String,
    slot: String,
    count: Number,
    token: String,
});

const Token = mongoose.model('Token', TokenSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/generate', async (req, res) => {
    const { userName, slot, count } = req.body;
    const tokenString = `${userName}-${slot}-${count}-${Date.now()}`;
    const token = new Token({ userName, slot, count, token: tokenString });
    await token.save();
    const qrCode = await QRCode.toDataURL(tokenString);
    res.json({ qrCode, token });
});

app.post('/verify', async (req, res) => {
    const { token } = req.body;
    const tokenDoc = await Token.findOne({ token });
    if (tokenDoc) {
        res.json({ valid: true, token: tokenDoc });
    } else {
        res.json({ valid: false });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
