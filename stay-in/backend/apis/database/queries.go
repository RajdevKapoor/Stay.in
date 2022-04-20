package database

import (
	// "database/sql"
	"stay-in/backend/apis/models"
	// "log"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)




func Connect() (*gorm.DB, error) {

	// var DB *gorm.DB
	 connection, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})
	// connection, err := sql.Open("sqlite3", "../data.db")

	if err != nil {
		panic("DB connection failed !!")
	}

	if err == nil {
		fmt.Print("successfully connected")
	}

	// DB = connection

	 connection.AutoMigrate(&models.For_rents{})

	return connection, err

}

// func GetStay(inputid int, DB  *gorm.DB) models.For_rents {

// 	//var stay *models.Stay

// 	// rows, err := DB.Query("SELECT * FROM for_rent WHERE Id = ?", inputid)


// 	// fmt.Print(rows.type())

// 	// if err != nil {
// 	// 	log.Fatalln(err)
// 	// }

// 	// var (
// 	// 	id       int
// 	// 	userID   string
// 	// 	state    string
// 	// 	lat      float64
// 	// 	long     float64
// 	// 	// purpose  string
// 	// 	// price    float64
// 	// 	// title    string
// 	// 	// rooms    int
// 	// 	// baths    int
// 	// 	// area     float64
// 	// 	// photoUrl string
//     //     // contact_name   string
// 	// )

// 	// //defer rows.Close()

// 	// for rows.Next() {
// 	// 	fmt.Print("working")
// 	// 	if err = rows.Scan(&id, &userID, &state, &lat, &long); err != nil {
// 	// 		log.Fatalln(err)
// 	// 	}
// 	// 	stay = &models.Stay{id, userID, state, lat, long}
// 	// 	fmt.Print("the stay '%v", stay)
// 	// }

// 	// return stay

// 	// for rows.Next() {
// 	// 	if err = rows.Scan(&id, &userID, &state, &lat, &long, &purpose, &price, &title, &rooms, &baths, &area, &photoUrl, &contact_name); err != nil {
// 	// 		log.Fatalln(err)
// 	// 	}
// 	// 	stay = &models.Stay{id, userID, state, lat, long, purpose, price, title, rooms, baths, area, photoUrl, contact_name}
// 	// }

// 	// fmt.Println("the stay")

// 	var stay models.For_rents
// 	if err := DB.Where("id = ?", inputid).Find(&stay).Error; err != nil{
// 		return nil
// 	}

// 	fmt.Println(stay)

// 	return stay
// }

