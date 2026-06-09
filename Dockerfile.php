FROM php:8.2-apache

WORKDIR /var/www/html

COPY api/ /var/www/html/api/

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
