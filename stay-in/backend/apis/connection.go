package database

import (
	"expenseManagement/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// connection, err := gorm.Open(mysql.Open("root:rootroot@/yt_go_auth"), &gorm.Config{})
	connection, err := gorm.Open(sqlite.Open("expense_management.db"), &gorm.Config{})

	if err != nil {
		panic("DB connection failed !!")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}