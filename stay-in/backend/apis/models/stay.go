package models

type Stay struct {
	id string `json:"id"`
	userId string `json:"userId"`
	state string `json:"state"`
	lat float64 `json:"lat"`
	long float64 `json:"long"`
	purpose string `json:"purpose"`
	price float64 `json:"price"`
	Title  string `json:"name"`
	Author string `json:"author"`
	rooms int    `json:"rooms"`
	baths int    `json:"baths"`
	area float64 `json:"area"`
}