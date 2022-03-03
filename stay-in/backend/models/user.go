package models

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email" gorm:"unique"`
	Password []byte `json:"-"`
}
