## How to run
* npm install selanjutnya npm run start.
* untuk mengetest api dapat menggunakan `request.rest` yang sudah disediakan supaya lebih mudah.

### Directory Structure
```bash
├───app/
│   ├───controller/
│   │   ├───api/
│   │   │   ├───v1/
│   │   │   │   ├───index.js
│   │   │   │   └───userController.js
│   │   │   ├───index.js
│   │   │   └───main.js
│   │   └───index.js
│   ├───models/
│   │   └───users.json
│   └───index.js
├───bin/
│   └───www
├───router/
│   ├───partials/
│   │   ├───index.js
│   │   └───userroute.js
│   └───index.js
├───.env
├───package-lock.json
├───package.json
├───README.md
└───request.rest
```

### Endpoint

GET 

#### Dependenci
```json
 "dependencies": {
    "body-parser": "^1.20.0",
    "dotenv": "^16.0.2",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "nodemon": "^2.0.19"
  }
```

```javascript
// accessToken diperoleh ketika user login dengan username dan password yang benar

const handleLoginUser = (req, res) => {
    const { username, password } = req.body
    const user = dataUsers.find((user) => (user.username == username))
    if (user == null) return res.json({ msg: "Data User Tidak Ditemukan" })
    if (user.password != password) return res.json({ msg: "Password Salah" })
    const userId = user.id
    const accessToken = jwt.sign({ username, password, userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" })
    res.json({ accessToken })
}

//Setelah accessToken diperoleh dari proses login selanjutnya accessToken diinputkan di postman/request.rest dengan headers Bearer 
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
```

```r
###  Login untuk Mendapatkan Token
POST http://localhost:8000/login
Content-Type: application/json

{
    "username":"bharada_e",
    "password":"fer303"
}

### Get user dengan menginputkan accessToken yang didapat dari proses Login Diatas
GET http://localhost:8000/user
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJoYXJhZGFfZSIsInBhc3N3b3JkIjoiZmVyMzAzIiwidXNlcklkIjozLCJpYXQiOjE2NjIyMjE5OTIsImV4cCI6MTY2MjIyMjAyMn0.UC7fa2_YhvF8etTC1dHLUgxq5Bem6UboteAmC0W-LTk


### Get Users dengan menginputkan accessToken yang didapat dari proses Login Diatas
GET http://localhost:8000/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJoYXJhZGFfZSIsInBhc3N3b3JkIjoiZmVyMzAzIiwidXNlcklkIjozLCJpYXQiOjE2NjIyMjEyNjYsImV4cCI6MTY2MjIyMTI5Nn0.haSRp7pddlIxXQjUsxknbfDseKvk1WIJCzA9iUriYHc


###  Register user, menambahkan user di folder app/models/users.json
POST http://localhost:8000/register
Content-Type: application/json

{
    "username":"sinaga",
    "password":"fer303"
}
```


<!-- <img style="width:27%;float:right;border-radius:150px"  src="https://res.cloudinary.com/dt3pzvmfg/image/upload/v1658573452/x1bbffnq1cold8srit8p.jpg" /> -->


