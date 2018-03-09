package redis

import (
	"github.com/go-redis/redis"
	"fmt"
)

const (
	host     = "47.52.241.241:6379"
	pssword = ""
	db       = 1
)

func LinkDb() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     host,
		Password: pssword,
		DB:       db,
	})
	pong, err := client.Ping().Result()
	fmt.Println(pong, err)

	return client
}

func CloseDb(client *redis.Client) {
	defer client.Close()
}
