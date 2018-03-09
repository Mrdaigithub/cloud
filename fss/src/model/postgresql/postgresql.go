package postgresql

import (
	"database/sql"
	_ "github.com/lib/pq"
)

const (
	host     = "47.52.241.241"
	port     = "5432"
	user     = "cloud"
	password = "cloud"
	dbname   = "cloud"
)

func LinkDb() *sql.DB {
	db, err := sql.Open("postgres", "user="+user+" password="+password+" host="+host+" port="+port+" dbname="+dbname+" sslmode=disable")
	checkErr(err)
	return db
}

func CloseDb(db *sql.DB) {
	db.Close()
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
