docker build . -t openfin-build --target nodebuild
docker run -d --name openfinbuild -p 3000:3000 openfin-build
pause
docker stop openfinbuild
docker rm openfinbuild
