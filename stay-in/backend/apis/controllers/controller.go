package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
    "stay-in/backend/apis/models"
)

const contentTypeJSON = "application/json"

var stay models.Stay

func getStays(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db, err1 := database.NewExpenseStoreSQL()

	if err1 != nil {
		log.Printf("couldn't get stay with the given ID: '%v'", err)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	enc := json.NewEncoder(w)

	// userID, err := strconv.Atoi(params["id"])

	userID = params["id"]

	if err != nil {
		log.Printf("couldn't get stay from URL path: '%v'", err)
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Couldn't get stay from URL path: %v", userID))
		enc.Encode(errorJSON)
		return
	}

	stay := queries.GetStay(userID)

	if stay == nil {
		w.WriteHeader(http.StatusNotFound)
		errorJSON := CreateErrorNotFound(fmt.Sprintf("Requested stay %v not found.", userID))
		enc.Encode(errorJSON)
		return
	}

	w.WriteHeader(http.StatusOK)
	enc.Encode(user)
}