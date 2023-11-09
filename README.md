# Full Custom Prometheus Metrics Example

## Description

This is a very simple demonstration for instrumenting a sample nodejs application.

This tutorial assumes that you already have a fully functioning K8s cluster, and you also have Prometheus running (with the operator). Also, you're using ECR and automatically allow your nodes to pull from ECR.

## Steps

1. Build and push the container to your registry

```bash
docker build --platform=linux/amd64 -t custom-metrics-experiment ./

# In my case I use ECR, and these are my own steps
docker tag custom-metrics-experiment xxxxxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com/custom-metrics-experiment:latest

docker push xxxxxxxxxxxx.dkr.ecr.eu-west-1.amazonaws.com/custom-metrics-experiment:latest
```

2. Apply the manifests in the `/manifests` folder.

```bash
kubectl apply -f ./manifests/deployment.yaml
kubectl apply -f ./manifests/service.yaml
kubectl apply -f ./manifests/ingress.yaml
kubectl apply -f ./manifests/serviceMonitor.yaml
```

3. Check on your ingress `/metrics` url.
