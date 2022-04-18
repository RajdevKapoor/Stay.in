package routes

import (
	"../controllers"
	"github.com/gofiber/fiber/v2"
)

//Function Setup for API's
func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
}
