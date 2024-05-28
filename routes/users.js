// Создаём роут для запросов категорий
const usersRouter = require("express").Router();

// Импортируем вспомогательные функции
const {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIfUsersAreSafe,
  filterPassword,
  hashPassword,
} = require("../middlewares/users");

const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
  sendMe,
} = require("../controllers/users");
const { checkAuth } = require("../middlewares/auth");

// Обрабатываем GET-запрос с роутом '/categories'
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);

usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);
usersRouter.get("/me", checkAuth, sendMe);

// Файл routes/users.js

usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);

usersRouter.delete(
  "/users/:id",
  checkAuth,
  deleteUser,
  sendUserDeleted
);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;
