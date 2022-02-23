package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) {
		c.Send("Hello, World!")
	})
	app.Post("/api/v1/signup", controllers.Signup)
	app.Get("/api/v1/signin", controllers.Signin)
}

func initDatabase() {
	var err error
	dbase.DBConn, err = gorm.Open("sqlite3", "stayDB/db1.db")
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connection Opened to Database")
//	dbase.DBConn.AutoMigrate(&model.User{})
}
func main() {
	app := fiber.New()
	initDatabase()
	setupRoutes(app)
	app.Listen(3000)
}
