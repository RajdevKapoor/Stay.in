package main

import (
	"os"
	"testing"

	"stay-in/backend/apis/models"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var dbName string = "test.db"
var storeName string = "testsecret"
var sessionName string = "testsession"
var stays []models.For_rents
var stay models.For_rents
var appointments []models.Appointments
var appointment models.Appointments

var router *gin.Engine

func initData(db *gorm.DB) {
	stays = []models.For_rents{
		{
			Id:      1234,
			UserId:  "6789",
			State:   "Active",
			Lat:     23.408,
			Long:    26.876,
			Purpose: "For-rent",
			Price:   16798.00,
			Title:   "4 bed 3 bath",
			Rooms:   4,
			Baths:   3,
			Area:    1000.4,
		},
		{
			Id:      123,
			UserId:  "678",
			State:   "Active",
			Lat:     23.49,
			Long:    21.476,
			Purpose: "For-rent",
			Price:   1679.00,
			Title:   "2 bed 3 bath",
			Rooms:   2,
			Baths:   3,
			Area:    1070.4,
		},
		{
			Id:      8964,
			UserId:  "3422",
			State:   "Active",
			Lat:     104.00,
			Long:    95.876,
			Purpose: "For-rent",
			Price:   24798.00,
			Title:   "21 bed 49 bath",
			Rooms:   21,
			Baths:   49,
			Area:    2950000.4,
		},
	}
	db.Create(&stays)

	appointments = []models.Appointments{
		{
			Id:                  40,
			Created_at:          "",
			Updated_at:          "",
			Deleted_at:          "",
			Appointment_date:    "11th may",
			Phone_number:        1234567,
			Email:               "abc@gmai.com",
			Registration_number: 1234,
			Service_type:        "Interim",
			Url:                 "test",
			Tracking_id:         876,
			First_name:          "test",
			Last_name:           "test",
			Status:              "test",
		},
		{
			Id:                  39,
			Created_at:          "",
			Updated_at:          "",
			Deleted_at:          "",
			Appointment_date:    "13th may",
			Phone_number:        12345,
			Email:               "def@gmai.com",
			Registration_number: 678,
			Service_type:        "Interim",
			Url:                 "test",
			Tracking_id:         908,
			First_name:          "Dh",
			Last_name:           "Ka",
			Status:              "test",
		},
		{
			Id:                  38,
			Created_at:          "",
			Updated_at:          "",
			Deleted_at:          "",
			Appointment_date:    "13th may",
			Phone_number:        37864,
			Email:               "jhg@gmail.com",
			Registration_number: 6354,
			Service_type:        "Interim",
			Url:                 "tesing",
			Tracking_id:         0,
			First_name:          "ka",
			Last_name:           "Dh",
			Status:              "test",
		},
	}
	db.Create(&appointments)
}

func setupTestDb(dbName string) *gorm.DB {
	// Connection to the database with default configuration
	db, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database!")
	}

	// drop tables if exist
	db.Migrator().DropTable(models.Appointments{})
	db.Migrator().DropTable(models.For_rents{})

	// Migrate USERS and REGISTEREDTRIPS model to the db
	db.AutoMigrate(&models.Appointments{}, &models.For_rents{})

	return db
}

func TestMain(m *testing.M) {
	// setup database
	db := setupTestDb(dbName)

	// init data
	initData(db)

	// setup router
	router = SetupRouter(db, storeName, sessionName)

	code := m.Run()

	os.Exit(code)
}
