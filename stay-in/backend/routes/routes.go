package routes

import (
	"github.com/RajdevKapoor/Stay.in/controllers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/addProperty", controllers.Register)
	app.Post("/api/messages", controllers.sendMessage)
	
}
