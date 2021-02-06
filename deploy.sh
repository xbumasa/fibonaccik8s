docker build -t xbumasa/fibonaccik8s-ui:latest -t xbumasa/fibonaccik8s-ui:$GIT_SHA ./ui
docker build -t xbumasa/fibonaccik8s-api:latest -t xbumasa/fibonaccik8s-api:$GIT_SHA ./api
docker build -t xbumasa/fibonaccik8s-worker:latest -t xbumasa/fibonaccik8s-worker:$GIT_SHA ./worker
docker push xbumasa/fibonaccik8s-ui:latest
docker push xbumasa/fibonaccik8s-api:latest
docker push xbumasa/fibonaccik8s-worker:latest
docker push xbumasa/fibonaccik8s-ui:$GIT_SHA
docker push xbumasa/fibonaccik8s-api:$GIT_SHA
docker push xbumasa/fibonaccik8s-worker:$GIT_SHA
kubectl apply -f k8s
kubectl set image deployments/api-deployment fibonacci-api=xbumasa/fibonaccik8s-api:$GIT_SHA
kubectl set image deployments/ui-deployment fibonacci-ui=xbumasa/fibonaccik8s-ui:$GIT_SHA
kubectl set image deployments/worker-deployment fibonacci-worker=xbumasa/fibonaccik8s-worker:$GIT_SHA
