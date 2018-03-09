package models

import (
	"github.com/jinzhu/gorm"
	"github.com/go-redis/redis"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"time"
)

const (
	host      = "47.52.241.241"
	pgPort    = "5432"
	redisPort = "6379"
	db        = "cloud"
	rdb       = 1
	user      = "cloud"
	password  = "cloud"
	rPassword = ""
	ssl       = "disable"
)

type Model struct {
	ID        uint `gorm:"primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func ConnOrm() *gorm.DB {
	db, err := gorm.Open("postgres", "host="+host+" port="+pgPort+" user="+user+" dbname="+db+" password="+password+" sslmode="+ssl)
	CheckErr(err)
	return db
}

func LinkRedis() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     host + ":" + redisPort,
		Password: rPassword,
		DB:       rdb,
	})
	_, err := client.Ping().Result()
	CheckErr(err)
	return client
}

func CheckErr(err error) {
	if err != nil {
		panic(err)
	}
}
