package logs

import (
	"os"
	"github.com/gin-gonic/gin"
	"io"
)

func Record() {
	f, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
}
