package routes

import (
	"../controller"
	"github.com/gofiber/fiber"
)

func Setup(app *fiber.App) {

	app.Post("/api/signup", controller.signup)


}