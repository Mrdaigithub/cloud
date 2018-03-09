package download

import (
	"github.com/gin-gonic/gin"
	"time"
	"app/models"
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
	c.String(200, resourceHash+userID)
	defaultExpiredTime := time.Second * 3600 * 1
	c.String(200, string(defaultExpiredTime))
	models.ConnOrm()
	//
	//err := db.QueryRow("SELECT count(id) FROM users WHERE id = " + userID).Scan(&userExists)
	//checkErr(err)
	//if userExists <= 0 {
	//	fmt.Print("err")
	//	return
	//}
	//
	//err = db.QueryRow("SELECT hash FROM resources WHERE file AND NOT trashed AND id=" + resourceID).Scan(&fileHash)
	//checkErr(err)
	//downloadSecret := utils.Encrypt(userID + "&" + fileHash + "&" + strconv.FormatInt(time.Now().Unix(), 10))
	//fmt.Print(downloadSecret)
	//postgresql.CloseDb(db)
	//rclient := redis.LinkDb()
	//err = rclient.Set("name", "zxc123", 5*time.Second).Err()
	//checkErr(err)
	//val, err := rclient.Get("name").Result()
	//checkErr(err)
	//fmt.Print(val)
	//w.Write([]byte("sdf"))
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
