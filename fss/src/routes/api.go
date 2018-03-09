package routes

import (
	"github.com/gin-gonic/gin"
	"app/controllers"
)

func SetupRouter(r *gin.Engine) {
	r.GET("/download/link/:userID/:resourceHash", download.GetDownloadLink)
}
