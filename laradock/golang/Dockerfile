FROM golang:1.10.0

MAINTAINER mrdai <mrdai346139312@gmail.com>

WORKDIR /var/www/fss/src

RUN echo "package main \n import (\"net/http\") \n func SayHello(w http.ResponseWriter, req *http.Request) {w.Write([]byte(\"Hello\"))} \n func main() {http.HandleFunc(\"/hello\", SayHello);http.ListenAndServe(\":80\", nil)}" > /var/www/fss/src/main.go
RUN echo "export GOPATH=/var/www/fss" \
    && echo "export GOBIN=/var/www/fss/bin" \

#RUN go get
#RUN go install

CMD ["go run main.go"]

EXPOSE 80
