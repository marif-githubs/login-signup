const pool = require("../Configuration/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handlelogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM USERS WHERE username = $1", [username]);

        if (result.rowCount != 1) {
            return res.json({ Message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].password);

        if (!isMatch) {
            return res.json({ Message: " Password Incorrect " });
        }
        console.log(result.rows[0].userid)
        const token = jwt.sign(result.rows[0].userid, process.env.JWT_SECRET);

        console.log(token);
        if (!token) {
            return res.json({ Message: "Login Fail" })
        }

        res.json({ token });

    } catch (err) {
        console.log(err);
        res.json({ Message: "Login Fail Error" })
    }
};

const handleregister = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const hashpassword = await bcrypt.hash(password, 12);

        let result = await pool.query("SELECT * FROM  USERS WHERE username = $1 OR email = $2 OR password = $3", [username, email, hashpassword]);

        if (result.rowCount != 0) {
            return res.json({ Message: "Cridentials already Exit" })
        }

        result = await pool.query(
            "INSERT INTO USERS( username, password, email) VALUES($1, $2, $3)",
            [username, hashpassword, email]
        );

        if (result.rowCount != 1) {
            console.log('not')
            return res.json({ Message: " Registration Fail " })
        }

        res.json({ Message: "User Register Successful" });
        console.log("handleregister");

    } catch (err) {
        res.json({ Message: " Registration Fail Error" })
        console.error(err);
    }
};

module.exports = {
    handlelogin,
    handleregister,
};
