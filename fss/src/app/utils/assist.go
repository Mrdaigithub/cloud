package utils

import (
	"io"
	"crypto/sha1"
)

func Encrypt(string string) []byte {
	hasher := sha1.New()
	b := []byte{}
	io.WriteString(hasher, string)
	return hasher.Sum(b)
}
