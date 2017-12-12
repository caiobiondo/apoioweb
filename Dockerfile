FROM registrynatura.azurecr.io/nginx-front
MAINTAINER Infra Digital Natura <infradigital@natura.net>

COPY build /usr/share/nginx/html
