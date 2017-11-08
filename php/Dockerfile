FROM php:7.0.25-fpm
RUN apt-get update && apt-get install -y \
        libmcrypt-dev \
        libpq-dev \
    && docker-php-ext-install mcrypt mbstring tokenizer pdo pdo_pgsql
RUN apt-get autoclean \
    && apt-get autoremove \
    && rm -rf /var/lib/apt/lists/*
#COPY ./conf/php.ini /usr/local/etc/php/