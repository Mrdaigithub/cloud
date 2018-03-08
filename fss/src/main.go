package main

import (
	"net/http"
	"download"
)

func main() {
	http.HandleFunc("/download/secret", download.GetDownloadSecret) //获取下载加密链接

	http.ListenAndServe(":8010", nil)
}
