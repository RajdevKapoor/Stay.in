package main

import (
	"github.com/RajdevKapoor/Stay.in/database"
	"github.com/RajdevKapoor/Stay.in/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()

	app := fiber.New()
	app.Use(cors.New())

	pusherClient := pusher.Client{
		AppID:   "1382233",
		Key:     "6448edf1a6faa7f3aaa6",
		Secret:  "b692dfb1814d55c47836",
		Cluster: "us2",
		Secure:  true,
	}

	
	routes.Setup(app)

	
	

	app.Listen(":8000")
}
