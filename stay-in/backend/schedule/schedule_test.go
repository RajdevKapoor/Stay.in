package schedule

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

	if err := a.DB.Migrator().HasTable("user_details"); err != true {
		log.Fatal(err)
	}

	code := m.Run()

	a.DB.Migrator().DropTable("client_details")
	a.DB.Migrator().DropTable("user_details")

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

func TestGetExistingTrackingID(t *testing.T) {

	var s ClientDetails

	s.TrackingID = "381539592"
	a.DB.Save(&s)

	req, _ := http.NewRequest("GET", "http://localhost:8080/getClient?trackingID=381539592", nil)

	w := httptest.NewRecorder()
	a.r.ServeHTTP(w, req)

	if want, got := http.StatusOK, w.Code; want != got {
		t.Fatalf("expected a %d, instead got: %d", want, got)
	}
}

func TestGetNonExistentUsername(t *testing.T) {
	req, _ := http.NewRequest("GET", "http://localhost:8080/checkUser?firstname=firstname&password=temp", nil)
	w := httptest.NewRecorder()
	a.r.ServeHTTP(w, req)

	if want, got := http.StatusOK, w.Code; want == got {
		t.Fatalf("expected a %d, instead got: %d", want, got)
	}
}

func TestGetExistingUsername(t *testing.T) {

	var u UserDetails

	u.FirstName = "backend"
	u.Password = "temp"
	a.DB.Save(&u)

	req, _ := http.NewRequest("GET", "http://localhost:8080/checkUser?firstname=backend&password=temp", nil)

	w := httptest.NewRecorder()
	a.r.ServeHTTP(w, req)

	if want, got := http.StatusOK, w.Code; want != got {
		t.Fatalf("expected a %d, instead got: %d", want, got)
	}
}

func TestIncorrectPassword(t *testing.T) {
	var u UserDetails

	u.FirstName = "backend"
	u.Password = "temp"
	a.DB.Save(&u)

	req, _ := http.NewRequest("GET", "http://localhost:8080/checkUser?firstname=backend&password=tempo", nil)

	w := httptest.NewRecorder()
	a.r.ServeHTTP(w, req)

	if want, got := http.StatusBadRequest, w.Code; want != got {
		t.Fatalf("expected a %d, instead got: %d", want, got)
	}

}
