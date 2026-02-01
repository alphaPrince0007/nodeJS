#!/bin/bash

#Number of requests to send
REQUESTS=10

# URL of your load balancer
URL="http://127.0.0.1:3000"

for ((i=1; i<=REQUESTS; i++)); do
    curl -s $URL >/dev/null &
    sleep 0.05
done

wait
echo "Sent $REQUESTS requests to the load balancer at $URL"


# wait
# echo "Sent $REQUESTS requests to the load balancer at $URL"