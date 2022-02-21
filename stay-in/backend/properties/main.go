package main

import (
	"fmt"

	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	"github.com/rajdev/stayin/database"
	"github.com/rajdev/stayin/stay"
)

func helloWorld(c *fiber.Ctx) {
	c.Send("Hello, World!")
}

func initDatabase() {
	var err error
	database.DBConn, err = gorm.Open("sqlite3", "stays.db")
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connection Opened to Database")

	database.DBConn.AutoMigrate(&stay.Stay{})
	fmt.Println("Database Migrated")
}

func setupRoutes(app *fiber.App) {
	app.Get("/", helloWorld)

	app.Get("/api/v1/stay", stay.Getstays)
	app.Get("/api/v1/stay/:id", stay.Getstay)
	app.Post("/api/v1/stay", stay.Newstay)
	app.Delete("/api/v1/stay/:id", stay.Deletestay)
}

func main() {
	app := fiber.New()
	initDatabase()

	setupRoutes(app)
	app.Listen(3000)
}