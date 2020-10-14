docker build . -t openfin-run
docker run -d --name openfinrun -p 3000:3000 openfin-run
pause
docker stop openfinrun
docker rm openfinrun
