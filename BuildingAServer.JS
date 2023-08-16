const { v4: uuidv4 } = require("uuid");
express = require("express");
const bcrypt = require("bcrypt");
const port = 8080;
const app = express();
app.use(express.json());

const saltRounds = 10;

id1 = "b1b47324-fc89-4ecd-a60b-51448f6caeff";
id2 = "639383bd-3dc5-46d1-9121-27fb6ac5a61d";
id3 = "38873ed8-c13a-441f-9d8c-2987ece26b7d";

const users = [
  { id: id1, email: "y456y66", password: "4587" },
  { id: id2, email: "uf5hu56", password: "5896" },
  { id: id3, email: "h7j7j75", password: "2145" },
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

// app.post("/users", (req, res) => {
//   const { password, email } = req.body;
//   const emailFound = users.findIndex((user) => user.email === email);
//   if (emailFound === -1) {
//     newUser = {
//       id: createId(),
//       email: email,
//       password: createPass(password),
//     };
//     users.push(newUser);
//     res.send(users);
//   } else {
//     res.send("error email is found");
//   }
// });

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { password, email } = req.body;
  const idFound = users.findIndex((user) => user.id === userId);
  if (idFound !== -1) {
    users.forEach((user) => {
      if (userId === user.id) {
        if (!email) {
          user.email = user.email;
        } else {
          user.email = email;
        }
        if (!password) {
          user.password = user.password;
        } else {
          user.password = createPass(password);
        }
        res.send(user);
      }
    });
  } else {
    res.send("error id is not found");
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const idFound = users.findIndex((user) => user.id === userId);
  if (idFound !== -1) {
    users.splice(idFound, 1);
    res.send("user delete ");
  } else {
    res.send("error id is not found");
  }
});

app.post('/users', (req, res) => {
  const { email, password } = req.body;
  const emailFound = users.findIndex((user) => user.email === email);
  if (emailFound !== -1 && bcrypt.compareSync(password, users[emailFound].password)) {
    res.send('User is connected');
  } else {
    res.send('Wrong credentials');
  }
});

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
