### App Running

To run the project just spin `sh ./develop.sh` from the project root.
The host for redis may need to be updated in te _.env_ file, if a connection error occurs run `docker network inspect app-network` and paste provide the redis host to the environment variable.
