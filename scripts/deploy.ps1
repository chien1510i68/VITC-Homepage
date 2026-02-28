# Script deploy nhanh lên Rancher/Kubernetes
# Sử dụng: .\scripts\deploy.ps1 [namespace] [image-version]

param(
    [string]$Namespace = "vitc-production",
    [string]$ImageVersion = "latest"
)

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Yellow "=== Deploy VITC Homepage lên Rancher ==="
Write-Output "Namespace: $Namespace"
Write-Output "Image Version: $ImageVersion"
Write-Output ""

# Kiểm tra kubectl
if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-ColorOutput Red "Error: kubectl is not installed"
    exit 1
}

# Kiểm tra kết nối cluster
Write-ColorOutput Green "Checking cluster connection..."
try {
    kubectl cluster-info | Out-Null
} catch {
    Write-ColorOutput Red "Error: Cannot connect to cluster"
    Write-Output "Please configure kubectl with your cluster credentials"
    exit 1
}

try {
    Write-ColorOutput Green "Step 1: Creating namespace..."
    kubectl apply -f k8s/namespace.yaml

    Write-ColorOutput Green "Step 2: Creating ConfigMap..."
    kubectl apply -f k8s/configmap.yaml

    Write-ColorOutput Green "Step 3: Creating Secrets..."
    kubectl apply -f k8s/secret.yaml

    Write-ColorOutput Green "Step 4: Deploying application..."
    kubectl apply -f k8s/deployment.yaml

    Write-ColorOutput Green "Step 5: Creating Service..."
    kubectl apply -f k8s/service.yaml

    Write-ColorOutput Green "Step 6: Creating Ingress..."
    kubectl apply -f k8s/ingress.yaml

    # Optional: HPA
    $enableHpa = Read-Host "Do you want to enable HPA (Horizontal Pod Autoscaler)? (y/n)"
    if ($enableHpa -eq "y" -or $enableHpa -eq "Y") {
        Write-ColorOutput Green "Step 7: Creating HPA..."
        kubectl apply -f k8s/hpa.yaml
    }

    Write-Output ""
    Write-ColorOutput Green "=== Deployment completed ==="
    Write-Output ""

    # Kiểm tra status
    Write-ColorOutput Yellow "Checking deployment status..."
    kubectl get pods -n $Namespace
    Write-Output ""
    kubectl get svc -n $Namespace
    Write-Output ""
    kubectl get ingress -n $Namespace

    Write-Output ""
    Write-ColorOutput Yellow "To view logs:"
    Write-Output "kubectl logs -f deployment/vitc-homepage -n $Namespace"
    Write-Output ""
    Write-ColorOutput Yellow "To check deployment status:"
    Write-Output "kubectl rollout status deployment/vitc-homepage -n $Namespace"

} catch {
    Write-ColorOutput Red "Error during deployment: $_"
    exit 1
}
