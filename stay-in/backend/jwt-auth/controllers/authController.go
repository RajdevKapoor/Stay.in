package controllers

import (
	"../database"
	"../models"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"github.com/dgrijalva/jwt-go/v4"
	"strconv"
	"time"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string

	//Unit test for Register
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := models.User{
		Email:    data["email"],
		Password: password,
	}

	database.DB > Create(&user)
	return c.JSON(user)

}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	//Unit Test for Login
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User
	database.DB.Where("email=?", data["email"]).First(&user)

	// Test for User ID
	if user.Id==0{
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message":"user not found"
		})
	}
    

	//Unit Test Correct Password
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err!= nil{
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message":"incorrect password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.StandardClaims{
		Issuer:strconv.Itoa(int(user.ID))
		ExpiresAt:time.Now().Add(time.Hour * 24).Unix(),
	})


	//Test for Possible Failed Login
	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message":"could not login",
		})
	}

	cookie :=fiber.Cookie{
		Name: "jwt",
		Value: token,
		ExpiresAt:time.Now().Add(time.Hour * 24),
		HTTPOnly: true, 
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message":"success",
	})
}


func User(c *fiber.Ctx) error{
	
	cookie := c.Cookies("jwt")
	
	token, err := jwt.ParseWithClaims(cookie,&jwt.StandardClaims{},func(token *jwt.Token)(interface{},error){
		return []byte(SecretKey),nil
	})
	
	//Unit Test to ensure User Authentication
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message":"unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)
	var user models.User
	
	database.DB.Where("id=?",claims.Issuer).First(&user)
	return c.JSON(user)
}
