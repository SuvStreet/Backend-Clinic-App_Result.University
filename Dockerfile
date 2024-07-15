# на основе чего будет образ
FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]


# doсker build -t clinic_app_backend .
# создать образ с тегом "clinic_app_backend" искать докерфайл в текущей папке "."

# docker run -p 3001:3000 -d clinic_app_backend
# запустить контейнер с портом 3001 в режиме detached (контейнер запуститься фоном,
# и его процес не связан с текущем терминалом) с тегом "clinic_app_backend" (наше приложение)

# docker image rm clinic_app_backend -f
# удалить образ с тегом "clinic_app_backend"

# docker images
# показать все образы

# docker run --rm clinic_app_backend
# запустить контейнер с тегом "clinic_app_backend" и удалить его после завершения работы

# docker ps
# показать все запущенные контейнеры

# docker ps -a
# показать все запущенные и остановленные контейнеры

# docker stop NAMES || CONTAINER ID
# остановить контейнер с именами "NAMES" или "CONTAINER ID"

# docker container rm NAMES || CONTAINER ID
# удалить контейнер с именами "NAMES" или "CONTAINER ID"

# docker run --name NAME -d IMAGE
# запустить новый контейнер с именем "NAME" и тегом "IMAGE"

# docker attach NAME
# присоединиться контейнеру в режиме attached с именем "NAME"

# docker logs NAME
# посмотреть логи контейнера "NAME"

# docker logs --follow NAME
# последовательно посмотреть логи контейнера "NAME"

# docker exec -it (interactive) NAME bash
# внутри контейнера "NAME" запустить bash

# docker kill NAME
# остановить принудительно контейнер с именем "NAME"
