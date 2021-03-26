cd ./server && docker-compose up --build -V -d

docker network create app-network
docker network connect app-network api
docker network connect app-network redis

cd .. 

yarn fe install --silent
yarn fe start