package database

import (
	"database/sql"
	"stay-in/backend/apis/models"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// ExpenseStoreSQL is an implementaton of ExpenseStore in sqlite3
type ExpenseStoreSQL struct {
	*sql.DB
}

func (es *ExpenseStoreSQL) GetStay(inputid int) *models.Stay {
	var user *models.Stay

	rows, err := es.Query("SELECT * FROM for_rent WHERE id = ?", inputid)

	if err != nil {
		log.Fatalln(err)
	}

	var (
		id       string
		userID   string
		state    string
		lat      float64
		long     float64
		purpose  string
		price    float64
		title    string
		rooms    int
		baths    int
		area     float64
		photoUrl string
        contact_name   string
	)

	for rows.Next() {
		if err = rows.Scan(&id, &userID, &state, &lat, &long, &purpose, &price, &title, &rooms, &baths, &area, &photoUrl, &contact_name); err != nil {
			log.Fatalln(err)
		}
		stay = &models.Stay{id, userID, state, lat, long, purpose, price, title, rooms, baths, area, photoUrl, contact_name}
	}

	return stay
}

