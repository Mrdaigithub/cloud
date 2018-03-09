package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"fmt"
	"reflect"
)

const (
	host     = "47.52.241.241"
	pgPort   = "5432"
	db       = "cloud"
	user     = "cloud"
	password = "cloud"
)

func ConnOrm() {
	db, err := gorm.Open("postgres", "host="+host+" port="+pgPort+" user="+user+" dbname="+db+" password="+password)
	CheckErr(err)
	fmt.Print(reflect.TypeOf(db))
}

func CheckErr(err error) {
	if err != nil {
		panic(err)
	}
}
