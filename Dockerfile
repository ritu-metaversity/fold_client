FROM nginx:stable-alpine

ENV CLIENT_APP wolf

ENV NGINX_PATH /etc/nginx/sites-enabled

COPY dist/$CLIENT_APP /var/www/$CLIENT_APP

RUN rm /etc/nginx/conf.d/default.conf

COPY nginxconfig.conf /etc/nginx/conf.d/default.conf
