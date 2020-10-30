# messenger Services API

To run the Services API execute the following commands

`
docker build . -t messengersvc-build
`

`
docker run -d --name messengersvc -p 5000:80 messengersvc-build
`

To test the host: browse to http://localhost:5000/healthz 

To stop the host and cleanup execute the following commands

`
docker stop chatsvc
`

`
docker rm chatsvc
`

