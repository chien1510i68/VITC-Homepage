#!/bin/bash

# Script để build và push Docker image lên registry
# Sử dụng: ./scripts/build-and-push.sh [version] [registry]

set -e

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Thông tin mặc định
DEFAULT_VERSION="1.0.0"
DEFAULT_REGISTRY="docker.io"  # Docker Hub
IMAGE_NAME="vitc-homepage"

# Lấy tham số
VERSION=${1:-$DEFAULT_VERSION}
REGISTRY=${2:-$DEFAULT_REGISTRY}
USERNAME=${DOCKER_USERNAME:-""}

# Validation
if [ -z "$USERNAME" ]; then
    echo -e "${RED}Error: DOCKER_USERNAME environment variable is not set${NC}"
    echo "Please set it: export DOCKER_USERNAME=your-username"
    exit 1
fi

# Build arguments
API_URL=${NEXT_PUBLIC_API_URL:-"https://api.vitc.edu.vn/api/v1"}

echo -e "${YELLOW}=== Build và Push Docker Image ===${NC}"
echo "Registry: $REGISTRY"
echo "Image: $IMAGE_NAME"
echo "Version: $VERSION"
echo "Username: $USERNAME"
echo "API URL: $API_URL"
echo ""

# Tạo full image name
if [ "$REGISTRY" = "docker.io" ]; then
    FULL_IMAGE="$USERNAME/$IMAGE_NAME"
else
    FULL_IMAGE="$REGISTRY/$USERNAME/$IMAGE_NAME"
fi

echo -e "${GREEN}Step 1: Building Docker image...${NC}"
docker build \
    --build-arg NEXT_PUBLIC_API_URL=$API_URL \
    --build-arg NODE_ENV=production \
    -t $IMAGE_NAME:$VERSION \
    -t $IMAGE_NAME:latest \
    .

echo -e "${GREEN}Step 2: Tagging image...${NC}"
docker tag $IMAGE_NAME:$VERSION $FULL_IMAGE:$VERSION
docker tag $IMAGE_NAME:latest $FULL_IMAGE:latest

echo -e "${GREEN}Step 3: Logging in to registry...${NC}"
if [ "$REGISTRY" = "docker.io" ]; then
    echo "Logging in to Docker Hub..."
    docker login
else
    echo "Logging in to $REGISTRY..."
    docker login $REGISTRY
fi

echo -e "${GREEN}Step 4: Pushing image to registry...${NC}"
docker push $FULL_IMAGE:$VERSION
docker push $FULL_IMAGE:latest

echo -e "${GREEN}=== Build và Push hoàn tất ===${NC}"
echo "Image: $FULL_IMAGE:$VERSION"
echo "Latest: $FULL_IMAGE:latest"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Cập nhật image trong k8s/deployment.yaml:"
echo "   image: $FULL_IMAGE:$VERSION"
echo ""
echo "2. Deploy lên Rancher:"
echo "   kubectl apply -f k8s/"
echo ""
echo "3. Hoặc update deployment:"
echo "   kubectl set image deployment/vitc-homepage vitc-homepage=$FULL_IMAGE:$VERSION -n vitc-production"
