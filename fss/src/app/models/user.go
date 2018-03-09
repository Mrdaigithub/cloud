package models

type User struct {
	Model
	Username string
	Email    string
	Password string
	Origin   string `gorm:"default:'local'"`
	Is_admin bool   `gorm:"default:false"`
	Capacity int64  `gorm:"default:5368709120"`
}
