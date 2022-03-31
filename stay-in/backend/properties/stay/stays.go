package stay

import (
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	"github.com/rajdev/stayin/database"
)

//TODO UPDATE
type Stay struct {
	gorm.Model
	Title  string `json:"name"`
	Author string `json:"author"`
	Rating int    `json:"rating"`
}

func Getstays(c *fiber.Ctx) {
	db := database.DBConn
	var stays []Stay
	db.Find(&stays)
	c.JSON(stays)
}

func Getstay(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn
	var stay Stay
	db.Find(&stay, id)
	c.JSON(stay)
}

func Newstay(c *fiber.Ctx) {
	db := database.DBConn
	var stay Stay
	stay.Title = "1984"
	stay.Author = "George Orwell"
	stay.Rating = 5
	db.Create(&stay)
	c.JSON(stay)
}

func Deletestay(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DBConn

	var stay Stay
	db.First(&stay, id)
	if stay.Title == "" {
		c.Status(500).Send("No stay Found with ID")
		return
	}
	db.Delete(&stay)
	c.Send("Book Successfully deleted")
}
