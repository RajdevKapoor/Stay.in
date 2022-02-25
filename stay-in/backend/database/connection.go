package database

import (
	"github.com/RajdevKapoor/Stay.in/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	DB = connection
	connection.AutoMigrate(&models.User{})
}
