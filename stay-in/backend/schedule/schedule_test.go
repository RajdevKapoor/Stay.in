package main

import (
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

var a App

func TestMain(m *testing.M) {
	a.Initialize("sqlite", "testing.db")

	if err := a.DB.Migrator().HasTable("client_details"); err != true {
		log.Fatal(err)
	}

	code := m.Run()

	a.DB.Migrator().DropTable("client_details")

	os.Exit(code)

}

func TestGetNonExistentTrackingID(t *testing.T) {
	req, _ := http.NewRequest("GET", "http://localhost:8080/getClient?trackingID=123456", nil)
	w := httptest.NewRecorder()
	a.r.ServeHTTP(w, req)

	if want, got := http.StatusOK, w.Code; want == got {
		t.Fatalf("expected a %d, instead got: %d", want, got)
	}
}
