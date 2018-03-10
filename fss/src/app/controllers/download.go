package download

import (
	"github.com/gin-gonic/gin"
	"app/models"
	"fmt"
	"time"
	"math/rand"
	"strconv"
	"app/utils"
	"net/http"
)

const (
	defaultExpiredTime = time.Second * 3600 * 1
	clientDomain       = "http://client.mrdaisite.com/"
)

/**
获取资源下载链接
 */
func GetDownloadLink(c *gin.Context) {
	resourceHash := c.Params.ByName("resourceHash")
	userID := c.Params.ByName("userID")
	password := c.Params.ByName("password")

	pgDB := models.ConnOrm()
	defer pgDB.Close()
	var resource models.Resource
	var resourceExists int64
	pgDB.Where("hash = ?", resourceHash).Find(&resource).Count(&resourceExists)
	if resourceExists <= 0 {
		fmt.Print("resource not exists")
		return
	}
	downloadSecret := utils.EncryptSha1(userID + strconv.Itoa(rand.Intn(100000)) + string(rand.Intn(1000)) + resourceHash + strconv.FormatInt(time.Now().Unix(), 10))

	rDB := models.LinkRedis()
	defer rDB.Close()
	rDB.HSet(downloadSecret, "userID", userID).Err()
	rDB.HSet(downloadSecret, "resourceHash", resourceHash).Err()
	rDB.HSet(downloadSecret, "password", password).Err()
	rDB.Expire(downloadSecret, defaultExpiredTime)

	c.JSON(http.StatusOK, gin.H{"downloadLink": clientDomain + "download/file/" + downloadSecret, "ttl": defaultExpiredTime})
}

func Test(c *gin.Context) {
	c.String(200, "test")
}
