package main

import (
	"fmt"
	"net/http"
)

func SayHello(w http.ResponseWriter, req *http.Request) {
	w.Write([]byte("Hello"))
	fmt.Print("hello\n")
}


func main() {
	http.HandleFunc("/hello", SayHello)
	http.ListenAndServe(":8010", nil)
}
