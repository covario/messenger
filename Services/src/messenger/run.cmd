docker build . -t chatsvc-build
docker run -d --name chatsvc -p 5000:80 chatsvc-build
pause
docker stop chatsvc
docker rm chatsvc
