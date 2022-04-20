package database

// import (
// 	"stay-in/backend/apis/models"
//     "fmt"
// 	"gorm.io/driver/sqlite"
// 	"gorm.io/gorm"
// )

// var DB *gorm.DB

// func Connect() {
// 	// connection, err := gorm.Open(mysql.Open("root:rootroot@/yt_go_auth"), &gorm.Config{})
// 	connection, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})

// 	if err != nil {
// 		panic("DB connection failed !!")
// 	}
// 	if err == nil {
// 		fmt.Print("successfully connected")
// 	}

// 	DB = connection

// 	connection.AutoMigrate(&models.Stay{})
// }