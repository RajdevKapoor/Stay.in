package models

type Appointments struct {
	Id int `json:"id"`
	Created_at string `json:"createdAt`
	Updated_at string `json:"updatedAt`
	Deleted_at string `json:"deletedAt`
	Appointment_date string `json:"appointmentDate`
	Phone_number int `json:"phoneNumber"`
	Email string `json:"email"`
	Registration_number int `json:"registrationNumber"`
	Service_type string `json:"servicetype"`
	Url string `json:"url"`
	Tracking_id  int `json:"tracking_id"`
	First_name string    `json:"firstName"`
	Last_name string    `json:"lastName"`
	Status string `json:"status"`
}