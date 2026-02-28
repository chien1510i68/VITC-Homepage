# Script để build và push Docker image lên registry
# Sử dụng: .\scripts\build-and-push.ps1 [version] [registry]

param(
    [string]$Version = "1.0.0",
    [string]$Registry = "docker.io",  # Docker Hub
    [string]$Username = $env:DOCKER_USERNAME
)

# Màu sắc cho output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Thông tin
$ImageName = "vitc-homepage"
$ApiUrl = if ($env:NEXT_PUBLIC_API_URL) { $env:NEXT_PUBLIC_API_URL } else { "https://api.vitc.edu.vn/api/v1" }

# Validation
if ([string]::IsNullOrEmpty($Username)) {
    Write-ColorOutput Red "Error: DOCKER_USERNAME environment variable is not set"
    Write-Output "Please set it: `$env:DOCKER_USERNAME = 'your-username'"
    exit 1
}

Write-ColorOutput Yellow "=== Build và Push Docker Image ==="
Write-Output "Registry: $Registry"
Write-Output "Image: $ImageName"
Write-Output "Version: $Version"
Write-Output "Username: $Username"
Write-Output "API URL: $ApiUrl"
Write-Output ""

# Tạo full image name
if ($Registry -eq "docker.io") {
    $FullImage = "$Username/$ImageName"
} else {
    $FullImage = "$Registry/$Username/$ImageName"
}

try {
    Write-ColorOutput Green "Step 1: Building Docker image..."
    docker build `
        --build-arg NEXT_PUBLIC_API_URL=$ApiUrl `
        --build-arg NODE_ENV=production `
        -t "${ImageName}:${Version}" `
        -t "${ImageName}:latest" `
        .

    if ($LASTEXITCODE -ne 0) { throw "Docker build failed" }

    Write-ColorOutput Green "Step 2: Tagging image..."
    docker tag "${ImageName}:${Version}" "${FullImage}:${Version}"
    docker tag "${ImageName}:latest" "${FullImage}:latest"

    Write-ColorOutput Green "Step 3: Logging in to registry..."
    if ($Registry -eq "docker.io") {
        Write-Output "Logging in to Docker Hub..."
        docker login
    } else {
        Write-Output "Logging in to $Registry..."
        docker login $Registry
    }

    if ($LASTEXITCODE -ne 0) { throw "Docker login failed" }

    Write-ColorOutput Green "Step 4: Pushing image to registry..."
    docker push "${FullImage}:${Version}"
    docker push "${FullImage}:latest"

    if ($LASTEXITCODE -ne 0) { throw "Docker push failed" }

    Write-ColorOutput Green "=== Build và Push hoàn tất ==="
    Write-Output "Image: ${FullImage}:${Version}"
    Write-Output "Latest: ${FullImage}:latest"
    Write-Output ""
    Write-ColorOutput Yellow "Next steps:"
    Write-Output "1. Cập nhật image trong k8s/deployment.yaml:"
    Write-Output "   image: ${FullImage}:${Version}"
    Write-Output ""
    Write-Output "2. Deploy lên Rancher:"
    Write-Output "   kubectl apply -f k8s/"
    Write-Output ""
    Write-Output "3. Hoặc update deployment:"
    Write-Output "   kubectl set image deployment/vitc-homepage vitc-homepage=${FullImage}:${Version} -n vitc-production"

} catch {
    Write-ColorOutput Red "Error: $_"
    exit 1
}
