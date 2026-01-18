# 🐳 Hướng dẫn chạy dự án VITC trên Production với Docker

## 📋 Yêu cầu

- Docker (phiên bản 20.10+)
- Docker Compose (phiên bản 1.29+)

## 🚀 Các bước triển khai

### 1. Cấu hình Environment Variables

Tạo file `.env.production` từ file mẫu:

```bash
cp .env.production.example .env.production
```

Chỉnh sửa file `.env.production` với thông tin production:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

### 2. Build Docker Image

**Cách 1: Sử dụng Docker Compose (Khuyến nghị)**

```bash
docker-compose build
```

**Cách 2: Sử dụng Docker trực tiếp**

```bash
docker build -t vitc-homepage:latest .
```

### 3. Chạy container

**Cách 1: Sử dụng Docker Compose (Khuyến nghị)**

```bash
docker-compose up -d
```

**Cách 2: Sử dụng Docker trực tiếp**

```bash
docker run -d \
  --name vitc-homepage \
  -p 3000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  vitc-homepage:latest
```

### 4. Kiểm tra trạng thái

```bash
# Xem logs
docker-compose logs -f

# Hoặc với Docker trực tiếp
docker logs -f vitc-homepage

# Kiểm tra container đang chạy
docker ps
```

Truy cập ứng dụng tại: `http://localhost:3000`

## 🔧 Các lệnh quản lý hữu ích

### Dừng container

```bash
# Docker Compose
docker-compose down

# Docker
docker stop vitc-homepage
```

### Khởi động lại

```bash
# Docker Compose
docker-compose restart

# Docker
docker restart vitc-homepage
```

### Xóa container và image

```bash
# Dừng và xóa container
docker-compose down

# Xóa image
docker rmi vitc-homepage:latest
```

### Rebuild sau khi cập nhật code

```bash
# Docker Compose
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Docker
docker stop vitc-homepage
docker rm vitc-homepage
docker build --no-cache -t vitc-homepage:latest .
docker run -d --name vitc-homepage -p 3000:3000 --env-file .env.production vitc-homepage:latest
```

## 🌐 Triển khai lên Server Production

### Với reverse proxy (Nginx/Caddy)

Cấu hình Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Với SSL/HTTPS (Let's Encrypt)

1. Cài đặt Certbot
2. Lấy SSL certificate
3. Cấu hình Nginx với HTTPS

## 📊 Monitoring

Xem resource usage:

```bash
docker stats vitc-homepage
```

Xem health status:

```bash
docker inspect --format='{{.State.Health.Status}}' vitc-homepage
```

## 🐛 Troubleshooting

### Container không start được

```bash
# Xem logs chi tiết
docker logs vitc-homepage

# Kiểm tra cấu hình
docker inspect vitc-homepage
```

### Port đã được sử dụng

```bash
# Thay đổi port trong docker-compose.yml
ports:
  - "8080:3000"  # Thay vì 3000:3000
```

### Rebuild khi có lỗi cache

```bash
docker-compose build --no-cache
```

## 📝 Notes

- Image size được tối ưu bằng multi-stage build (~150MB)
- Sử dụng Node.js Alpine để giảm kích thước
- Container chạy với non-root user (nextjs) để bảo mật
- Healthcheck được cấu hình sẵn
- Auto-restart khi container bị crash

## 🔒 Bảo mật

- Không commit file `.env.production` vào Git
- Sử dụng Docker secrets cho thông tin nhạy cảm trong production
- Cấu hình firewall cho server
- Giới hạn resource cho container nếu cần

```yaml
# Thêm vào docker-compose.yml
services:
  vitc-web:
    # ...
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```
