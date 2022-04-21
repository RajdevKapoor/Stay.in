package controllers

import (

	"net/http"
	// "stay-in/backend/apis/database"
    "stay-in/backend/apis/models"
	"strconv"
	"gorm.io/gorm"
	"github.com/gin-gonic/gin"
)

const contentTypeJSON = "application/json"

var stay models.For_rents

func GetStays(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {

		stay_id, err := strconv.Atoi(c.Param("id"))

		if(err != nil){
			return
		}

		var record []models.For_rents

		
		if err := db.Where("id = ?", stay_id).First(&record).Error; err != nil {
			// if err := db.Find(&record).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": record})

	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}


// func GetStays(w http.ResponseWriter, r *http.Request) {

// 	fmt.Print("GetStays")
// 	params := mux.Vars(r)
// 	db, err1 := database.Connect()

// 	if err1 != nil {
// 		log.Printf("couldn't get stay with the given ID: '%v'", err1)
// 	}
	
// 	// if err1 == nil{
// 	// 	fmt.Print(db);
// 	// }

// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	w.Header().Set("Content-Type", "application/json")
// 	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

// 	enc := json.NewEncoder(w)

// 	userID, err := strconv.Atoi(params["id"])

// 	// var userID = params["id"]

// 	fmt.Print(userID)

// 	if err != nil {
// 		log.Printf("couldn't get UserID from URL path: '%v'", err)
// 		w.WriteHeader(http.StatusNotFound)
// 		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get UserID from URL path: %v", userID))
// 		enc.Encode(errorJSON)
// 		return
// 	}

// 	stay := database.GetStay(userID,db)

// 	if stay == nil {
// 		w.WriteHeader(http.StatusNotFound)
// 		errorJSON := CreateErrorNotFound(fmt.Sprintf("Requested stay %v not found.", userID))
// 		enc.Encode(errorJSON)
// 		return
// 	}

// 	w.WriteHeader(http.StatusOK)
// 	enc.Encode(stay)
// 	fmt.Println(stay)
// }

// type ErrorJSON struct {
// 	Code    string       `json:"code"`
// 	Message string       `json:"message"`
// 	Errors  []ErrorField `json:"errors,omitempty"`
// }

// type ErrorField struct {
// 	Message string
// 	Field   string
// }

// const NotFound = "NOT_FOUND"

// func CreateErrorNotFound(message string) ErrorJSON {
// 	return ErrorJSON{NotFound, message, nil}
// }


func InsertStays(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json models.For_rents
		// try to bind the request json to the Login struct
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// // strips HTML input from user for security purpose
		// p := bluemonday.StripTagsPolicy()

		// json.Source = p.Sanitize(json.Source)
		// json.Destination = p.Sanitize(json.Destination)
		// json.Date_of_trip = p.Sanitize(json.Date_of_trip)
		// json.Time_of_trip = p.Sanitize(json.Time_of_trip)

		// create the announcement
		result := db.Create(&json)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"result": "stay created successfully",
		})
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}


func DeleteStays(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {

		stay_id, err := strconv.Atoi(c.Param("id"))

		if(err != nil){
			return
		}

		var record models.For_rents
		if err := db.Where("id = ?", stay_id).Delete(&record).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": true})

	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}


func UpdateStays(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json models.For_rents
		// try to bind the request json to the Login struct
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// strips HTML input from user for security purpose
		// p := bluemonday.StripTagsPolicy()

		// json.Username = p.Sanitize(json.Username)
		// json.Password = p.Sanitize(json.Password)
		// json.Fname = p.Sanitize(json.Fname)
		// json.Lname = p.Sanitize(json.Lname)
		// json.Phoneno = p.Sanitize(json.Phoneno)
		// json.Carname = p.Sanitize(json.Carname)
		// json.Bio = p.Sanitize(json.Bio)

		//Fetching user information using username
		var us models.For_rents
		db.Find(&us, "id = ?", json.Id)

		result := db.Model(&us).Where("id=?", json.Id).Updates(json)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, us)
	}
	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}


func GetSchedules(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {

		schedule_id, err := strconv.Atoi(c.Param("id"))

		if(err != nil){
			return
		}

		var record []models.Appointments

		
		if err := db.Where("id = ?", schedule_id).First(&record).Error; err != nil {
			// if err := db.Find(&record).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": record})

	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}


func CreateSchedules(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json models.Appointments
		// try to bind the request json to the Login struct
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// // strips HTML input from user for security purpose
		// p := bluemonday.StripTagsPolicy()

		// json.Source = p.Sanitize(json.Source)
		// json.Destination = p.Sanitize(json.Destination)
		// json.Date_of_trip = p.Sanitize(json.Date_of_trip)
		// json.Time_of_trip = p.Sanitize(json.Time_of_trip)

		// create the announcement
		result := db.Create(&json)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"result": "appointment created successfully",
		})
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}



func DeleteSchedules(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {

		schedule_id, err := strconv.Atoi(c.Param("id"))

		if(err != nil){
			return
		}

		var record models.Appointments
		if err := db.Where("id = ?", schedule_id).Delete(&record).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": true})

	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}


func UpdateSchedules(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json models.Appointments
		// try to bind the request json to the Login struct
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// strips HTML input from user for security purpose
		// p := bluemonday.StripTagsPolicy()

		// json.Username = p.Sanitize(json.Username)
		// json.Password = p.Sanitize(json.Password)
		// json.Fname = p.Sanitize(json.Fname)
		// json.Lname = p.Sanitize(json.Lname)
		// json.Phoneno = p.Sanitize(json.Phoneno)
		// json.Carname = p.Sanitize(json.Carname)
		// json.Bio = p.Sanitize(json.Bio)

		//Fetching user information using username
		var us models.Appointments
		db.Find(&us, "id = ?", json.Id)

		result := db.Model(&us).Where("id=?", json.Id).Updates(json)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, us)
	}
	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}

