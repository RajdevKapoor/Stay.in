package test

import (
	"properites/stay"
	"testing"
)

var (
	server = setUpServer()
	//w      = httptest.NewRecorder()
)

//Test for Newstay
func TestNewstay(t *testing.T) {
	var stayi = Models.Stay{Title: "1984", Author: "George Orwell", Rating: "5"}
	if Models.Newstay(stayi) == 0 {
		t.Error("result is wrong!")
	} else {
		t.Log("result is right")
	}
}

//Test for Delete Stay
func TestDeletestay(t *testing.T) {
	//var stayi = Models.Stay{Title: 1984, Author: George Orwell,Rating: 5}
	if Models.Deletestay(1984,George Orwell,5) == 0 {
		t.Error("result is wrong!")
	} else {
		t.Log("result is right")
	}
}