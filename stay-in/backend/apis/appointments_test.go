package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"stay-in/backend/apis/models"

	"github.com/stretchr/testify/assert"
)

func TestCreateAppointment(t *testing.T) {
	appointment := models.Appointments{
		Id:                  50,
		Created_at:          "",
		Updated_at:          "",
		Deleted_at:          "",
		Appointment_date:    "15th may",
		Phone_number:        123567,
		Email:               "abc@yahoo.com",
		Registration_number: 134,
		Service_type:        "Interim",
		Url:                 "test",
		Tracking_id:         876,
		First_name:          "Dh",
		Last_name:           "Ka",
		Status:              "test",
	}
	payload, _ := json.Marshal(appointment)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/createSchedule", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	req1.Header.Set("Cookie", cookieValue)
	router.ServeHTTP(nr, req1)
	assert.Equal(t, 200, nr.Code)
}

func TestGetAppointment(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/schedule/39", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)

}

func TestUpdateAppointment(t *testing.T) {
	nr := httptest.NewRecorder()
	appointment := models.Appointments{
		Id:                  38,
		Created_at:          "",
		Updated_at:          "",
		Deleted_at:          "",
		Appointment_date:    "18th may",
		Phone_number:        37864,
		Email:               "jhg@gmail.com",
		Registration_number: 6354,
		Service_type:        "Interim",
		Url:                 "tesing",
		Tracking_id:         0,
		First_name:          "ka",
		Last_name:           "Dh",
		Status:              "test",
	}
	body, _ := json.Marshal(appointment)
	req, _ := http.NewRequest("PUT", "/updateSchedule/", strings.NewReader(string(body)))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req)
	assert.Equal(t, 200, nr.Code)
}

func TestDeleteAppointment(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/deleteSchedule/38", nil)
	router.ServeHTTP(w, req)
	req.Header.Set("credentials", "include")
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}
