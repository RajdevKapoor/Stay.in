package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pusher/pusher-http-go"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	pusherClient := pusher.Client{
		AppID:   "1382233",
		Key:     "6448edf1a6faa7f3aaa6",
		Secret:  "b692dfb1814d55c47836",
		Cluster: "us2",
		Secure:  true,
	}
	app.Post("/api/messages", func(c *fiber.Ctx) error {

		var data map[string]string
		if err := c.BodyParser(&data); err != nil {
			return err
		}
		pusherClient.Trigger("chat", "message", data)
		return c.JSON(data)
	})

	app.Listen(":8000")
}
