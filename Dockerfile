FROM registrynatura.azurecr.io/nginx-front
MAINTAINER Infra Digital Natura <infradigital@natura.net>

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
