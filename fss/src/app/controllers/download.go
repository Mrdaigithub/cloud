package download

import (
	"github.com/gin-gonic/gin"
	"app/models"
	"fmt"
	"strconv"
	"time"
	"app/utils"
	"net/http"
)

const (
	defaultExpiredTime = time.Second * 3600 * 1
	clientDomain       = "http://client.mrdaisite.com/"
)

func GetDownloadLink(c *gin.Context) {
	resourceHash := c.Params.ByName("resourceHash")
	userID := c.Params.ByName("userID")

	pgDB := models.ConnOrm()
	defer pgDB.Close()
	var resource models.Resource
	var resourceExists int64
	pgDB.Where("hash = ?", resourceHash).Find(&resource).Count(&resourceExists)
	if resourceExists <= 0 {
		fmt.Print("resource not exists")
		return
	}
	downloadSecret := utils.EncryptSha1(userID + "&" + resourceHash + "&" + strconv.FormatInt(time.Now().Unix(), 10))

	rDB := models.LinkRedis()
	defer rDB.Close()
	err := rDB.Set(downloadSecret, resourceHash, defaultExpiredTime).Err()
	models.CheckErr(err)
	c.JSON(http.StatusOK, gin.H{"downloadLink": clientDomain + "download/file/" + downloadSecret, "ttl": defaultExpiredTime})
}
