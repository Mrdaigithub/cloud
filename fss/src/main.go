package main

import (
	"fmt"
)

//func SayHello(w http.ResponseWriter, req *http.Request) {
//	w.Write([]byte("Hello"))
//	fmt.Print("hello")
//}

func main() {
	fmt.Print("hello")

	//http.HandleFunc("/hello", SayHello)
	//http.ListenAndServe(":8001", nil)
}
