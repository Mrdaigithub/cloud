package download

import (
	"github.com/gin-gonic/gin"
	"app/models"
	"fmt"
	"app/utils"
	"strconv"
	"time"
)

var DB = make(map[string]string)

func Geting(c *gin.Context) {
	user := c.Params.ByName("name")
	value, ok := DB[user]
	if ok {
		c.JSON(200, gin.H{"user": user, "value": value})
	} else {
		c.JSON(200, gin.H{"user": user, "status": "no value"})
	}
}

func GetDownloadLink(c *gin.Context) {
	resourceHash := c.Params.ByName("resourceHash")
	userID := c.Params.ByName("userID")
	//defaultExpiredTime := time.Second * 3600 * 1

	pgDB := models.ConnOrm()
	defer pgDB.Close()
	var resource models.Resource
	var resourceExists int64
	pgDB.Where("hash = ?", resourceHash).Find(&resource).Count(&resourceExists)
	if resourceExists <= 0 {
		fmt.Print("resource not exists")
		return
	}
	downloadSecret := utils.Encrypt(userID + "&" + resourceHash + "&" + strconv.FormatInt(time.Now().Unix(), 10))
	fmt.Println(strconv.Itoa(int(downloadSecret)))

	//rDB := models.LinkRedis()
	//err := rDB.Set("name", "zxc123", defaultExpiredTime).Err()
	//models.CheckErr(err)
	//val, err := rDB.Get("name").Result()
	//models.CheckErr(err)
	//fmt.Print(val)
}
