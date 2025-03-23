const pool = require("../Configuration/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handlelogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM USERS WHERE username = $1", [username]);

        if (result.rowCount != 1) {
            return res.json({ Message: "User Not Found", status: "Fail" });
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].password);

        if (!isMatch) {
            return res.json({ Message: " Password Incorrect ", status: "Fail" });
        }

        const token = jwt.sign(result.rows[0].userid, process.env.JWT_SECRET);

        if (!token) {
            return res.json({ Message: "Login Fail", status: "Fail" })
        }

        res.cookie('JWT_token', token, {
            httpOnly: "true",
            maxAge: 3600000
        });
        res.json({
            Message: "Login Successful ",
            token, status: "Success"
        });

    } catch (err) {
        console.log(err);
        res.json({ Message: "Login Fail Error", status: "Fail" })
    }
};

const handleregister = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const hashpassword = await bcrypt.hash(password, 12);

        let result = await pool.query("SELECT * FROM  USERS WHERE username = $1 OR email = $2 OR password = $3", [username, email, hashpassword]);

        if (result.rowCount != 0) {
            return res.json({ Message: "Cridentials already Exit", status: "Fail" })
        }

        result = await pool.query(
            "INSERT INTO USERS( username, password, email) VALUES($1, $2, $3)",
            [username, hashpassword, email]
        );

        if (result.rowCount != 1) {
            console.log('not')
            return res.json({ Message: " Registration Fail ", status: "Fail" })
        }

        res.json({ Message: "User Register Successful", status: "Success" });
        console.log("handleregister");

    } catch (err) {
        res.json({ Message: " Registration Fail Error", status: "Fail" })
        console.error(err);
    }
};

module.exports = {
    handlelogin,
    handleregister,
};
