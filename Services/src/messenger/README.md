# messenger Services API

To run the Services API execute the following commands

`
docker build . -t chatsvc-build
`

`
docker run -d --name chatsvc -p 5000:80 chatsvc-build
`

To test the API browser to http://localhost:5000/healthz 

To stop the Services API and cleanup execute the following commands

`
docker stop chatsvc
`

`
docker rm chatsvc
`

