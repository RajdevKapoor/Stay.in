package database

import (
	"database/sql"
	"expenseManagement/models"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// ExpenseStoreSQL is an implementaton of ExpenseStore in sqlite3
type ExpenseStoreSQL struct {
	*sql.DB
}

// GetUser queries the database for a user and returns it if it's found, nil otherwise
func (es *ExpenseStoreSQL) GetUser(inputid int) *models.User {
	var user *models.User

	rows, err := es.Query("SELECT * FROM user WHERE id = ?", inputid)

	if err != nil {
		log.Fatalln(err)
	}

	var (
		id       int64
		name     string
		email    string
		password string
	)

	for rows.Next() {
		if err = rows.Scan(&id, &name, &email, &password); err != nil {
			log.Fatalln(err)
		}
		user = &models.User{id, name, email, password}
	}

	return user
}

func (es *ExpenseStoreSQL) CreateUser(Name string, Email string, Password string) bool {
	stmt, err := es.Prepare("INSERT into user(ID, name, email, password) values(?,?,?,?)")

	_, err1 := stmt.Exec(nil, Name, Email, Password)
	defer stmt.Close()

	if err1 != nil || err != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) LoginUser(requestEmail string, requestPassword string) *models.User {
	var user *models.User
	var (
		id       int64
		name     string
		email    string
		password string
	)
	err := es.QueryRow("SELECT * FROM user WHERE email = ?", requestEmail).Scan(&id, &name, &email, &password)
	if err != nil {
		if err != sql.ErrNoRows {
			log.Fatalln(err)
		} else {
			log.Println("User doesn't exist!")
			return nil
		}
	} else {
		if password != requestPassword {
			log.Println("Incorrect password!")
			return nil
		}
		user = &models.User{id, name, email, password}
	}
	return user
}

func (es *ExpenseStoreSQL) CreateExpense(expenseObj map[string]string) bool {
	stmt, err := es.Prepare("INSERT into expense(ID, name, description, category, amount, userid) values(?,?,?,?,?,?)")
	_, err1 := stmt.Exec(nil, expenseObj["name"], expenseObj["spent_on"], expenseObj["category"], expenseObj["amount"], expenseObj["userid"])
	if err1 != nil {
		return false
	}
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) RetrieveExpense(reqName string, reqCategory string, reqDesc string) *models.Expense {
	var expense *models.Expense
	var (
		id          int64
		name        string
		category    string
		description string
		amount      float64
		userid      int64
	)
	err := es.QueryRow("SELECT * from expense WHERE name = ? and category = ? and description = ?", reqName, reqCategory, reqDesc).Scan(&id, &name, &category, &description, &amount, &userid)
	if err != nil {
		log.Println(err)
		if err != sql.ErrNoRows {
			log.Println(err)
		} else {
			log.Println("No expense record exist")
			return nil
		}
	} else {
		expense = &models.Expense{id, userid, name, category, description, amount}
	}
	return expense
}

func (es *ExpenseStoreSQL) RecordPayment(paymentObj map[string]string) bool {
	stmt, err := es.Prepare("INSERT into expense(ID, name, description, category_id, amount) values(?,?,?,?,?)")
	_, err1 := stmt.Exec(nil, paymentObj["name"], paymentObj["description"], paymentObj["category_id"], paymentObj["amount"])
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) DeletePaymentRecord(paymentID string) bool {
	stmt, err := es.Prepare("DELETE from expense(ID, name, description, category_id, amount) where ?")
	_, err1 := stmt.Exec(paymentID)
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

func (es *ExpenseStoreSQL) RecordPaymentSplit(paymentsplitObj map[string]string) bool {
	stmt, err := es.Prepare("INSERT into payment_split(ID, borrowers, amount, user_id, expense_id, timestamp) values(?,?,?,?,?,?)")
	_, err1 := stmt.Exec(nil, paymentsplitObj["borrowers"], paymentsplitObj["amount"], paymentsplitObj["user_id"], paymentsplitObj["expense_id"], paymentsplitObj["timestamp"])
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}

// NewExpenseStoreSQL returns a pointer to an initialized ExpenseStoreSQL
func NewExpenseStoreSQL() (*ExpenseStoreSQL, error) {
	e := ExpenseStoreSQL{}

	db, err := sql.Open("sqlite3", "./expense_management.db")
	if err != nil {
		return nil, err
	}

	e.DB = db

	return &e, nil
}
func (es *ExpenseStoreSQL) UpdatePassword(paymentObj map[string]string) bool {
	stmt, err := es.Prepare("UPDATE into user(ID, name, description, category_id, amount) values(?,?,?,?,?)")
	_, err1 := stmt.Exec(nil, paymentObj["name"], paymentObj["description"], paymentObj["category_id"], paymentObj["amount"])
	defer stmt.Close()
	// log.Fatalln(err)
	log.Println(err, err1)
	if err != nil || err1 != nil {
		return false
	}
	return true
}
© 2022 GitHub, Inc.
Terms
