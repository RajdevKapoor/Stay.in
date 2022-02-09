package controllers

import (
	"fmt"

	"../dbase"
	"../model"
	"github.com/gofiber/fiber"
)

func Signup(c *fiber.Ctx) {
	db := dbase.DBConn
	var u model.User
	u.FirstName = "Dharani"
	u.LastName = "Kanchanapalli"
	u.Email = "dharanik@gmail.com"
	u.Password = "1234"
	fmt.Println(db.Create(&u))
	fmt.Println(c.JSON(u))
}

func Signin(c *fiber.Ctx) {
	email := c.Params("email")
	db := dbase.DBConn
	var u model.User
	db.Find(&u, email)
	fmt.Println("user successfully signed in")
	c.JSON(u)
}
