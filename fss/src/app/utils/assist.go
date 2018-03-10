package utils

import (
	"io"
	"crypto/sha1"
	"crypto/md5"
	"encoding/hex"
)

func EncryptSha1(string string) string {
	hasher := sha1.New()
	b := []byte{}
	io.WriteString(hasher, string)
	return hex.EncodeToString(hasher.Sum(b))
}

func EncryptMd5(string string) string {
	hasher := md5.New()
	b := []byte{}
	io.WriteString(hasher, string)
	return hex.EncodeToString(hasher.Sum(b))
}

func B2S(bs []int8) string {
	b := make([]byte, len(bs))
	for i, v := range bs {
		b[i] = byte(v)
	}
	return string(b)
}
