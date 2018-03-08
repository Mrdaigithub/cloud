package download

import (
	"net/http"
	"github.com/go-pg/pg"
	"fmt"
)

func GetDownloadSecret(w http.ResponseWriter, req *http.Request) {
	db := pg.Connect(&pg.Options{
		Addr:     "47.52.241.241:5432",
		User:     "cloud",
		Password: "cloud",
		Database: "cloud",
	})
	req.ParseForm()
	userID := req.Form["user_id"][0]
	resourceID := req.Form["resource_id"][0]
	var idCount int
	_, err := db.QueryOne(pg.Scan(&idCount), "SELECT count(id) FROM users WHERE id="+userID)
	if err != nil {
		panic(err)
	}
	if idCount == 0 {
		fmt.Print("err")
	}
	var r []string
	_, rerr := db.QueryOne(pg.Scan(&r), "SELECT id FROM resources WHERE id="+resourceID)
	if rerr != nil {
		panic(rerr)
	}
	fmt.Print(r)
}
