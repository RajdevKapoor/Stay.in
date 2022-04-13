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

	// Success Login

}
