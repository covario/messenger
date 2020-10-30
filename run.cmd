SET CONFIGURATION=Development
SET VERSION_FULL=1.0.0
SET ARTIFACT_PATH=%CD%/Artifact
docker build . -t messengerslnbuild
docker run -d --name messengersln -p 5002:80 messengerslnbuild
pause
docker stop messengersln
docker rm messengersln
