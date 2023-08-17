const { v4: uuidv4 } = require("uuid");
express = require("express");
const bcrypt = require("bcrypt");
var validator = require("validator");

const port = 8080;
const app = express();
app.use(express.json());

const saltRounds = 10;

id1 = "b1b47324-fc89-4ecd-a60b-51448f6caeff";
id2 = "639383bd-3dc5-46d1-9121-27fb6ac5a61d";
id3 = "38873ed8-c13a-441f-9d8c-2987ece26b7d";

const users = [
  { id: id1, email: "ari@bar.com", password: "4587" },
  { id: id2, email: "shtipi@bar.com", password: "5896" },
  { id: id3, email: "zeev@bar.com", password: "2145" },
];

users.forEach((element) => {
  const hash = bcrypt.hashSync(element.password, saltRounds);
  element.password = hash;
});

function createPass(password) {
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

function createId() {
  return uuidv4();
}

function validatorEmail(email) {
  return validator.isEmail(email);
}
function validatorPassword(password) {
  return validator.isStrongPassword(password);
}

app.get("/", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  users.forEach((user) => {
    if (id === user.id) {
      res.send(user);
    }
  });
});

app.post("/users/addUser", (req, res) => {
  const { password, email } = req.body;
  pass = createPass(password);
  if (validatorEmail(email) && validatorPassword(pass)) {
    const emailFound = users.find((user) => user.email === email);
    if (!emailFound) {
      newUser = {
        id: createId(),
        email: email,
        password: pass,
      };
      users.push(newUser);
      res.send(newUser);
    } else {
      res.send("error email is found");
    }
  } else {
    res.send("error email OR  password not validator");
  }
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { password, email } = req.body;
  pass = createPass(password);
  if (validatorEmail(email) && validatorPassword(pass)) {
    const idFound = users.find((user) => user.id === userId);
    if (idFound) {
      users.forEach((user) => {
        if (userId === user.id) {
          if (!email) {
            user.email = user.email;
          } else {
            user.email = email;
          }
          if (!pass) {
            user.password = user.password;
          } else {
            user.password =pass;
          }
          res.send(user);
        }
      });
    } else {
      res.status(400).send("error id is not found");
    }
  } else {
    res.status(400).send("error email OR  password not validator");
  }
});

app.delete("/users/delete/:id", (req, res) => {
  const userId = req.params.id;
  const idFound = users.findIndex((user) => user.id === userId);
  if (idFound !== -1) {
    users.splice(idFound, 1);
    res.send("user delete ");
  } else {
    res.send("error id is not found");
  }
});

app.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  if (
    users.find(
      (user) =>
        (user.email === email) && bcrypt.compareSync(password, user.password)
    )
  ) {
    res.send("user is connected");
  } else {
    res.send("wrong credentials");
  }
});

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
