package controllers

import (
	"fmt"

	"gotest/dbase"
	"gotest/model"

	"github.com/gofiber/fiber"
)



func Signup(c *fiber.Ctx) {
	db := dbase.DBConn
	fmt.Println(db)
	var u model.User
	u.FirstName = "D"
	u.LastName = "K"
	u.Email = "dk@gmail.com"
	u.Password = "1234"
	db.Create(&u)
	c.JSON(u)
}

func Signin(c *fiber.Ctx) {
	// email := c.Params("email")
	db := dbase.DBConn
	var u []model.User
	db.Raw("select * from users").Scan(&u)
	fmt.Println(u)
	fmt.Println("user successfully signed in")
	c.JSON(u)
}
