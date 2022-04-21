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

func TestCreateStay(t *testing.T) {
	stay := models.For_rents{
		Id:      8974,
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
	}
	payload, _ := json.Marshal(stay)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/createStay", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	req1.Header.Set("Cookie", cookieValue)
	router.ServeHTTP(nr, req1)
	assert.Equal(t, 200, nr.Code)
}

func TestGetStay(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/stay/1234", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)

}

func TestUpdateStay(t *testing.T) {
	nr := httptest.NewRecorder()
	user := models.For_rents{
		Id:      8964,
		UserId:  "3422",
		State:   "Active",
		Lat:     104.00,
		Long:    95.876,
		Purpose: "For-rent",
		Price:   24798.00,
		Title:   "21 bed 48 bath",
		Rooms:   21,
		Baths:   49,
		Area:    2800000.4,
	}
	body, _ := json.Marshal(user)
	req, _ := http.NewRequest("PUT", "/updateStay/", strings.NewReader(string(body)))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req)
	assert.Equal(t, 200, nr.Code)
}

func TestDeleteStay(t *testing.T) {

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/deleteStay/123", nil)
	router.ServeHTTP(w, req)
	req.Header.Set("credentials", "include")
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}
