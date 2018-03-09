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

func B2S(bs []int8) string {
	b := make([]byte, len(bs))
	for i, v := range bs {
		b[i] = byte(v)
	}
	return string(b)
}
