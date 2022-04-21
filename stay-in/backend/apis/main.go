package main

import (
	// "net/http"
	// "fmt"
	// mux "github.com/gorilla/mux"
	// routes "stay-in/backend/apis/routes"
	"github.com/gin-gonic/gin"
    m "stay-in/backend/apis/models"
	c "stay-in/backend/apis/controllers"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"


)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func SetupRouter(db *gorm.DB, storeName string, sessionName string) *gin.Engine {

	r := gin.New()
	r.Use(CORSMiddleware())

	// Adding logger to the middleware
	//r.Use(gin.Logger())

	// Using default recovery mechanism in case of any unexpected crashes in webserver
	r.Use(gin.Recovery())

	store := cookie.NewStore([]byte(storeName))
	store.Options(sessions.Options{MaxAge: 60 * 60 * 24})
	r.Use(sessions.Sessions(sessionName, store))

	// **** END POINTS ****

	r.GET("/stay/:id", c.GetStays(db))
	r.POST("/createStay", c.InsertStays(db))
	r.DELETE("/deleteStay/:id", c.DeleteStays(db))
	r.PUT("/updateStay/", c.UpdateStays(db))

	r.GET("/schedule/:id", c.GetSchedules(db))
	r.POST("/createSchedule", c.CreateSchedules(db))
	r.DELETE("/deleteSchedule/:id", c.DeleteSchedules(db))
	r.PUT("/updateSchedule/", c.UpdateSchedules(db))
	return r

}

func main(){
	// fmt.Print("test")
    // router := mux.NewRouter()
	// routes.Setup(router)
	// http.Handle("/", router)
	// http.ListenAndServe("localhost:8080", router)

	db, err := gorm.Open(sqlite.Open("data.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the User model to the db
	db.AutoMigrate(&m.For_rents{})
	db.AutoMigrate(&m.Appointments{})
	// db.AutoMigrate(&m.REGISTEREDTRIPS{})
	// db.AutoMigrate(&m.TRIPMAPPINGS{})

	// setting up the webserver with default config
	storeName := "mainsecret"
	sessionName := "mainsession"
	r := SetupRouter(db, storeName, sessionName)

	// starts server and listens on port 8181
	r.Run(":8080")
}



