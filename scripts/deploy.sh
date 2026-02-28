#!/bin/bash

# Script deploy nhanh lên Rancher/Kubernetes
# Sử dụng: ./scripts/deploy.sh [namespace] [image-version]

set -e

# Màu sắc
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Tham số
NAMESPACE=${1:-vitc-production}
IMAGE_VERSION=${2:-latest}

echo -e "${YELLOW}=== Deploy VITC Homepage lên Rancher ===${NC}"
echo "Namespace: $NAMESPACE"
echo "Image Version: $IMAGE_VERSION"
echo ""

# Kiểm tra kubectl
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: kubectl is not installed${NC}"
    exit 1
fi

# Kiểm tra kết nối cluster
echo -e "${GREEN}Checking cluster connection...${NC}"
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Error: Cannot connect to cluster${NC}"
    echo "Please configure kubectl with your cluster credentials"
    exit 1
fi

echo -e "${GREEN}Step 1: Creating namespace...${NC}"
kubectl apply -f k8s/namespace.yaml

echo -e "${GREEN}Step 2: Creating ConfigMap...${NC}"
kubectl apply -f k8s/configmap.yaml

echo -e "${GREEN}Step 3: Creating Secrets...${NC}"
kubectl apply -f k8s/secret.yaml

echo -e "${GREEN}Step 4: Deploying application...${NC}"
kubectl apply -f k8s/deployment.yaml

echo -e "${GREEN}Step 5: Creating Service...${NC}"
kubectl apply -f k8s/service.yaml

echo -e "${GREEN}Step 6: Creating Ingress...${NC}"
kubectl apply -f k8s/ingress.yaml

# Optional: HPA
read -p "Do you want to enable HPA (Horizontal Pod Autoscaler)? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Step 7: Creating HPA...${NC}"
    kubectl apply -f k8s/hpa.yaml
fi

echo ""
echo -e "${GREEN}=== Deployment completed ===${NC}"
echo ""

# Kiểm tra status
echo -e "${YELLOW}Checking deployment status...${NC}"
kubectl get pods -n $NAMESPACE
echo ""
kubectl get svc -n $NAMESPACE
echo ""
kubectl get ingress -n $NAMESPACE

echo ""
echo -e "${YELLOW}To view logs:${NC}"
echo "kubectl logs -f deployment/vitc-homepage -n $NAMESPACE"
echo ""
echo -e "${YELLOW}To check deployment status:${NC}"
echo "kubectl rollout status deployment/vitc-homepage -n $NAMESPACE"
