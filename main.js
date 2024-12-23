const { writeFile } = require("fs");
const fs = require("fs/promises");

const filterData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  const filterdData = data.filter((element) => element.title.length < 30);
  await fs.writeFile("posts.json", JSON.stringify(filterdData));
};

filterData();

// 2

const createUser = async (email, name, age) => {
  const data = await fs.readFile("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  if (parsedData.find((el) => el.email == email)) {
    console.log("User already Exists");
    return;
  }
  const newUser = {
    email,
    name,
    age,
  };
  parsedData.push(newUser);
  await fs.writeFile("users.json", JSON.stringify(parsedData));
};

const deleteUser = async (email) => {
  const data = await fs.readFile("users.json", "utf-8");
  const parsedData = JSON.parse(data);

  const index = parsedData.findIndex((el) => el.email === email);
  if (index === -1) {
    console.log("User does not exist!");
    return;
  }
  parsedData.splice(index, 1);

  await fs.writeFile("users.json", JSON.stringify(parsedData));
};

const command = process.argv[2];
const email = process.argv[3];
const name = process.argv[4];
const age = process.argv[5];

if (command == "CREATE") {
  createUser(email, name, age);
}
if (command == "DELETE") {
  deleteUser(email);
}

// 3
const Asccending = async () => {
  const data = await fs.readFile("products.json", "utf-8");
  const parsedData = JSON.parse(data);
  parsedData.sort((a, b) => a.price - b.price);
  await fs.writeFile("products.json", JSON.stringify(parsedData));
};

const Desccending = async () => {
  const data = await fs.readFile("products.json", "utf-8");
  const parsedData = JSON.parse(data);
  parsedData.sort((a, b) => b.price - a.price);
  await fs.writeFile("products.json", JSON.stringify(parsedData));
};

const sortCommand = process.argv[2];

if (sortCommand == "ASC") {
  Asccending();
}
if (sortCommand == "DESC") {
  Desccending();
}
