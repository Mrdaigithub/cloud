package download

import (
	"net/http"
	_ "github.com/lib/pq"
	"model/postgresql"
	"model/redis"
	"fmt"
	"time"
	"strconv"
	"utils"
)

func GetDownloadSecret(w http.ResponseWriter, req *http.Request) {
	var userExists int
	var fileHash string

	req.ParseForm()
	userID := req.Form["user_id"][0]
	resourceID := req.Form["resource_id"][0]
	expiredTime := req.Form["expired"]
	fmt.Print(expiredTime)
	db := postgresql.LinkDb()

	err := db.QueryRow("SELECT count(id) FROM users WHERE id = " + userID).Scan(&userExists)
	checkErr(err)
	if userExists <= 0 {
		fmt.Print("err")
		return
	}

	err = db.QueryRow("SELECT hash FROM resources WHERE file AND NOT trashed AND id=" + resourceID).Scan(&fileHash)
	checkErr(err)
	downloadSecret := utils.Encrypt(userID + "&" + fileHash + "&" + strconv.FormatInt(time.Now().Unix(), 10))
	fmt.Print(downloadSecret)
	//rows, err := db.Query("SELECT id, username FROM users")
	//checkErr(err)
	//for rows.Next() {
	//	var uid int
	//	var username string
	//	err = rows.Scan(&uid, &username)
	//	checkErr(err)
	//	fmt.Print(uid, username, "\n")
	//}
	postgresql.CloseDb(db)
	rclient := redis.LinkDb()
	err = rclient.Set("name", "zxc123", 5*time.Second).Err()
	checkErr(err)
	val, err := rclient.Get("name").Result()
	checkErr(err)
	fmt.Print(val)
	w.Write([]byte("sdf"))
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
