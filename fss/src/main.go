package main

import (
	"github.com/gin-gonic/gin"
	"routes"
	"logs"
)

func main() {
	logs.Record()         // record routes
	r := gin.Default()    // init instance
	routes.SetupRouter(r) // setup routes
	r.Run(":8010")        // listening port
}
