SET CONFIGURATION=Development
SET VERSION_FULL=1.0.0
SET ARTIFACT_PATH=%CD%/Artifact
docker build . -t chatslnbuild
docker run -d --name chatsln -p 5002:80 chatslnbuild
pause
docker stop chatsln
docker rm chatsln
