FROM mariadb:latest

RUN apt-get update && apt-get install -y wget && apt-get clean

RUN wget https://ergast.com/downloads/f1db.sql.gz -P /docker-entrypoint-initdb.d
RUN gunzip /docker-entrypoint-initdb.d/f1db.sql.gz
