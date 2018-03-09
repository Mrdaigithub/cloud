package models

type Resource struct {
	Model
	Id            int64
	Resource_name string
	Hash          string
	Size          int64 `gorm:"default:0"`
	File          bool  `gorm:"default:true"`
	Trashed       bool  `gorm:"default:false"`
}
