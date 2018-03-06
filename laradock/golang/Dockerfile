FROM golang:alpine

MAINTAINER mrdai <mrdai346139312@gmail.com>

WORKDIR /usr/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["app"]

EXPOSE 8010
