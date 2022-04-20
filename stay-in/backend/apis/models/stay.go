package models

type For_rents struct {
	Id int `json:"id"`
	UserId string `json:"userId"`
	State string `json:"state"`
	Lat float64 `json:"lat"`
	Long float64 `json:"long"`
	Purpose string `json:"purpose"`
	Price float64 `json:"price"`
	Title  string `json:"title"`
	Rooms int    `json:"rooms"`
	Baths int    `json:"baths"`
	Area float64 `json:"area"`
}