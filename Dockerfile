FROM ubuntu:22.04

RUN apt update && apt install -y apache2 php-mysql php-gd php-mbstring php-xml php-curl git curl && apt clean

COPY ./html/ /var/www/html/

CMD ["apache2ctl", "-D", "FOREGROUND"]
