const fs = require("fs")
const file = fs.readFileSync("app/models/users.json")
const dataUsers = JSON.parse(file)
const jwt = require("jsonwebtoken")

const Tes = (req, res) => {
    res.send("<h1>Halo Selamat Datang</h1>")
}

const handleGetUsers = (req, res) => {
    res.status(200).json(dataUsers)
}

const handleGetUser = (req, res) => {
    const username = req.user.username
    const user = dataUsers.find((orang) => (orang.username == username))
    res.json({ msg: "Berhasil", user })
}

const handleRegisterUser = (req, res) => {
    const { username, password } = req.body
    const cekUser = dataUsers.find((user) => (user.username == username))
    if (cekUser != null) return res.json({ msg: "username sudah terdaftar" })
    const userNew = {
        id: dataUsers.length + 1, username, password
    }
    dataUsers.push(userNew)
    fs.writeFileSync("app/models/users.json", JSON.stringify(dataUsers))
    res.json({ msg: "Berhasil", userNew })
}

const handleLoginUser = (req, res) => {
    const { username, password } = req.body
    const user = dataUsers.find((user) => (user.username == username))
    if (user == null) return res.json({ msg: "Data User Tidak Ditemukan" })
    if (user.password != password) return res.json({ msg: "Password Salah" })
    const userId = user.id
    const accessToken = jwt.sign({ username, password, userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" })
    res.json({ accessToken })
}

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: "Dilarang" })
        req.user = user
        next()
    })
}


module.exports = { Tes, handleGetUsers, handleLoginUser, handleRegisterUser, handleGetUser, authentication }