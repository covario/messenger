docker build . -t chatsvc-build
docker run -d --name chatsvc -p 5001:80 chatsvc-build
start http://localhost:5001
pause
docker stop chatsvc
docker rm chatsvc
