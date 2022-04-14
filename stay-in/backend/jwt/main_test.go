package main

import (
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert/v2"
	_ "gorm.io/gorm/schema"
	"net/http"
	"net/http/httptest"
	"testing"
)

var (
	server = setUpServer()
	//w      = httptest.NewRecorder()
)

func TestUserLogin(t *testing.T) {
	server := setUpServer()
	//server.Use(gin.Recovery(), gin.Logger(), userSession)
	//email, _, server := login()

	// Failed Register: Email Already Exists
	w := httptest.NewRecorder()
	param := make(map[string]string)
	param["email"] = "shivam@gmail.com"
	param["password"] = "Shivam123"
	jsonByte, _ := json.Marshal(param)
	req, _ := http.NewRequest("POST", "/api/login", bytes.NewReader(jsonByte))
	server.ServeHTTP(w, req)
	response := "{\"msg\":\"email already exists\",\"status\":\"error\"}"
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, w.Body.String(), response)

	// Failed Login: Not registered
	w2 := httptest.NewRecorder()
	param2 := make(map[string]string)
	param2["email"] = "Shivam12@gmail.com"
	param2["password"] = "123412"
	jsonByte2, _ := json.Marshal(param2)
	req2, _ := http.NewRequest("POST", "/api/login", bytes.NewReader(jsonByte2))
	server.ServeHTTP(w2, req2)
	response2 := "{\"msg\":\"email or password is wrong\",\"status\":\"error\"}"
	assert.Equal(t, 200, w2.Code)
	assert.Equal(t, w2.Body.String(), response2)

	// Success Login
	w3 := httptest.NewRecorder()
	param3 := make(map[string]string)
	param3["email"] = "shivamg@gmail.com"
	param3["password"] = "Shivam123"
	jsonByte3, _ := json.Marshal(param3)
	req3, _ := http.NewRequest("POST", "/api/login", bytes.NewReader(jsonByte3))
	server.ServeHTTP(w3, req3)
	response3 := "{\"msg\":\"login success\",\"status\":\"success\"}"
	assert.Equal(t, 200, w3.Code)
	assert.Equal(t, w3.Body.String(), response3)
}
