package main

import (
	"github.com/gin-gonic/gin"
	"routes"
	"logs"
	"app/middlewares"
)

func main() {
	logs.Record()      // record routes
	r := gin.Default() // init instance
	r.StaticFile("/assets/xx.mp4", "./storage/DPlayer Demo.MP4")
	middlewares.Middleware(r)
	routes.SetupRouter(r) // setup routes
	r.Run(":8010")        // listening port
}
