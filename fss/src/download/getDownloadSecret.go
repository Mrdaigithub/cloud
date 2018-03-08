package download

import (
	"net/http"
	_ "github.com/lib/pq"
	"model"
	"fmt"
)

func GetDownloadSecret(w http.ResponseWriter, req *http.Request) {
	db := model.LinkDb()
	rows, err := db.Query("SELECT id, username FROM users")
	checkErr(err)
	for rows.Next() {
		var uid int
		var username string
		err = rows.Scan(&uid, &username)
		checkErr(err)
		fmt.Print(uid, username, "\n")
	}
	model.CloseDb(db)
	w.Write([]byte("sdf"))
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
