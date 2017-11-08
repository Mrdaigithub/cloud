FROM nginx:stable-alpine
ENV TZ=Asia/Shanghai
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/vhost /etc/nginx/conf.d
COPY ./logs /logs
COPY ./html /html