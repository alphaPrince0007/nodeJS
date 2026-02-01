#!/bin/bash

#Number of requests to send
REQUESTS=10

# URL of your load balancer
URL="http://localhost:3000"

#Loop to send requests
for((i=1; i<=REQUESTS; i++)); do
    curl $URL &
done

wait
echo "Sent $REQUESTS requests to the load balancer at $URL"