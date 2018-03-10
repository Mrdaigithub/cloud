package middlewares

import "github.com/gin-gonic/gin"

func Middleware(r *gin.Engine) {
	r.Use(gin.Recovery())
}
