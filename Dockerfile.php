FROM composer:2 AS vendor

WORKDIR /app
COPY api/composer.json ./composer.json
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --optimize-autoloader

FROM php:8.2-apache

WORKDIR /var/www/html

COPY --from=vendor /app/vendor /var/www/html/vendor
COPY api/ /var/www/html/api/

RUN rm -f /var/www/html/api/composer.json \
    && printf 'variables_order = "EGPCS"\n' > /usr/local/etc/php/conf.d/zz-env.ini \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
