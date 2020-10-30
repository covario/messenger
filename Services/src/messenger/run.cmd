docker build . -t messengersvc-build
docker run -d --name messengersvc -p 5000:80 messengersvc-build
pause
docker stop messengersvc
docker rm messengersvc
