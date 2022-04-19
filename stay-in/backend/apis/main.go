package main

import (
	"net/http"
    "stay-in/backend/apis/database"
	"fmt"
	mux "github.com/gorilla/mux"
	"gorm.io/gorm"
	routes "stay-in/backend/apis/routes"
)

var DB *gorm.DB

func main(){
	database.Connect()
	fmt.Print("test")
    router := mux.NewRouter()
	routes.Setup(router)
	http.Handle("/", router)
	http.ListenAndServe("localhost:8080", router)

}



