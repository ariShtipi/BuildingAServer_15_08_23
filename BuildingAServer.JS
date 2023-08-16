const { v4: uuidv4 } = require("uuid");
express = require("express");
const app = express();
const port = 8080;
app.use(express.json());

function createId() {
  return uuidv4();
}

id1 = "b1b47324-fc89-4ecd-a60b-51448f6caeff";
id2 = "639383bd-3dc5-46d1-9121-27fb6ac5a61d";
id3 = "38873ed8-c13a-441f-9d8c-2987ece26b7d";

const users = [
  { id: id1, email: "y456y66", password: "4587" },
  { id: id2, email: "uuyu56", password: "5896" },
  { id: id3, email: "h7j7j75", password: "2145" },
];

// app.get("/", (req, res) => {
//   res.send(users);
// });

// app.get("/users/:id", (req, res) => {
//   const id = req.params.id;
//   users.forEach((element) => {
//     if (id == element.id) {
//       res.send(element);
//     }
//   });
// });

// app.post("/users", (req, res) => {
//   newUser = {
//     id: createId(),
//     email: req.body.email,
//     password: req.body.password,
//   };
//   users.push(newUser);
//   res.send(users);
// });

// app.put("/users/:id", (req, res) => {
//   const userId = req.params.id;
//   users.forEach((element) => {
//     if (userId == element.id) {
//       element.email = req.body.email;
//       element.password = req.body.password;
//     }
//   });
//   res.send(users);
// });

// app.delete("/users/:id", (req, res) => {
//   const userId = req.params.id;
//   users.forEach((element, i) => {
//     if (userId == element.id) {
//       users.splice(i,1);
//     }
//     res.send(users);
//   });
// });

app.post("/users", (req, res) => {
  const userEmail = req.body.email;
  const userPass = req.body.password;
  let bool = false;
  users.forEach((element) => {
    if ((element.email == userEmail) & (element.password == userPass)) {
      res.send("user is connected");
      bool = true;
    }
  });
  if (!bool) {
    res.send("not exist such a user in our data");
  }
});


app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
