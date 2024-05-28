// Файл routes/games.js

const gamesRouter = require("express").Router();

const { checkAuth } = require("../middlewares/auth.js");

const {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
  checkIsVoteRequest,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendGameCreated
);
gamesRouter.get("/games/:id", findGameById, sendGameById);

// Файл routes/games.js

// Пока запишем порядок действий псевдокодом
// Файл routes/games.js

gamesRouter.put(
  "/games/:id", // Слушаем запросы по эндпоинту
  // Шаг 1. Находим игру по id из запроса
  findGameById,
  checkIsVoteRequest,
  // Шаг 2. Выполняем проверки для корректного обновления
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  // Шаг 3. Обновляем запись с игрой
  updateGame,
  // Шаг 4. Возвращаем на клиент ответ с результатом обновления
  sendGameUpdated
);

gamesRouter.delete(
  "/games/:id", // Слушаем запросы по эндпоинту
  checkAuth,
  deleteGame,
  sendGameDeleted // Тут будут функция удаления элементов из MongoDB и ответ клиенту
);

module.exports = gamesRouter;
