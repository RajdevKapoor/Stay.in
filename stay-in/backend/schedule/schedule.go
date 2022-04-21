package schedule

import (
	"encoding/json"
	"fmt"
	"log"

	"math/rand"
	"net/http"

	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type App struct {
	DB *gorm.DB
}

type ClientDetails struct {
	gorm.Model
	AppointmentDate    string `json:"appointmentDate"`
	PhoneNumber        string `json:"phoneNumber"`
	Email              string `json:"email"`
	RegistrationNumber string `json:"registrationNumber"`
	ServiceType        string `json:"serviceType"`
	URL                string `json:"url"`
	TrackingID         string `json:"trackingID"`
	FirstName          string `json:"firstName"`
	LastName           string `json:"lastName"`
}

//Test for database Connection
func (a *App) Initialize(dbDriver string, dbURI string) {
	db, err := gorm.Open(sqlite.Open(dbURI), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	a.DB = db

	// Migrate the schema.
	a.DB.AutoMigrate(&ClientDetails{})
	fmt.Println("initiated db")
	a.DB.Create(&ClientDetails{
		AppointmentDate:    "12th feb",
		PhoneNumber:        "12345",
		Email:              "test@email.com",
		RegistrationNumber: "12345",
		ServiceType:        "interim",
		URL:                "test",
		TrackingID:         "123456",
		FirstName:          "test",
		LastName:           "test",
	})

}

func (a *App) handler(w http.ResponseWriter, r *http.Request) {
	// Create a test Star.
	//a.DB.Create(&ClientDetails{FirstName: "test"})
	fmt.Println("inside handler")
	//fmt.Println(w)
	fmt.Println(r.Body)
	a.DB.Create(&ClientDetails{
		AppointmentDate:    "13th feb",
		PhoneNumber:        "12345",
		Email:              "test@email.com",
		RegistrationNumber: "12345",
		ServiceType:        "interim",
		URL:                "test",
		TrackingID:         "123456",
		FirstName:          "test",
		LastName:           "test",
	})

	// Read from DB.
	//var contact ClientDetails
	//a.DB.First(&contact, "FirstName = ?", "test")

	// Write to HTTP response.
	w.WriteHeader(200)
	//w.Write([]byte(contact.FirstName))

	// Delete.
	//a.DB.Delete(&contact)
}

func (a *App) CreateHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var s ClientDetails
	err := json.NewDecoder(r.Body).Decode(&s)
	if err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
		return
	}

	v := rand.Intn(9999999999-1000000000) + 1000000000
	s.TrackingID = strconv.Itoa(v)
	a.DB.Save(&s)
	resp := make(map[string]string)
	resp["message"] = "Status Created"
	resp["trackingID"] = s.TrackingID
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(jsonResp)
}

func (a *App) getClient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	temp := r.URL.Query().Get("trackingID")
	fmt.Println(temp)
	var client ClientDetails
	//err := a.DB.Find(&temp).Error
	a.DB.Where("tracking_id = ?", temp).First(&client)
	//fmt.Println(a.DB.Where("tracking_id = ?", temp).First(&ClientDetails{}))
	fmt.Println(client.FirstName)

	resp := make(map[string]string)
	resp["firstname"] = client.FirstName
	resp["lastname"] = client.LastName
	resp["phone_number"] = client.PhoneNumber
	resp["email"] = client.Email
	resp["registration_number"] = client.RegistrationNumber
	resp["service_type"] = client.ServiceType
	resp["appointment_date"] = client.AppointmentDate

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)

}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}

func main() {
	//Database Connection
	a := &App{}
	a.Initialize("sqlite", "ClientDetails.db")

	r := mux.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200", "http://localhost:4200/AppointmentForm"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "DELETE", "POST", "PUT"},
	})

	handler := c.Handler(r)

	r.HandleFunc("/", a.handler)
	fmt.Println("called handler")
	r.HandleFunc("/stars", a.CreateHandler).Methods("POST")
	r.HandleFunc("/getClient", a.getClient).Methods("GET")

	log.Fatal(http.ListenAndServe(":8080", handler))

}
