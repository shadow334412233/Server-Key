const express = require('express');
const app = express();
app.use(express.json());

let keysDatabase = [
    { key: "VIP-KEY-001", used: false, hwid: null },
    { key: "VIP-KEY-002", used: false, hwid: null },
    { key: "VIP-KEY-003", used: false, hwid: null }
];

app.post('/api/verify', (req, res) => {
    const { key, hwid } = req.body;
    if (!key || !hwid) {
        return res.json({ success: false, message: "Missing key or HWID!" });
    }
    const foundKey = keysDatabase.find(k => k.key === key);
    if (!foundKey) {
        return res.json({ success: false, message: "Invalid Key!" });
    }
    if (foundKey.used) {
        if (foundKey.hwid === hwid) {
            return res.json({ success: true, message: "Welcome back!" });
        } else {
            return res.json({ success: false, message: "Key already used on another device!" });
        }
    }
    foundKey.used = true;
    foundKey.hwid = hwid;
    return res.json({ success: true, message: "Key activated successfully!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`License Server is running on port ${PORT}`);
});
