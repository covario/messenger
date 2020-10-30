# Messenger Host

To run the Services API execute the following commands from the Services folder

`
docker build . -t messenger-build
docker run -d --name messenger -p 5000:80 messenger-build
`

To test the host: browse to http://localhost:5000/healthz 

To stop the host and cleanup execute the following commands

`
docker stop messenger
docker rm messenger
`
