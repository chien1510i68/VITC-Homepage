# Hướng dẫn cài đặt MCP Server Figma

## Giới thiệu
MCP (Model Context Protocol) Server cho Figma giúp bạn kết nối AI với các file thiết kế Figma, cho phép code dựa theo giao diện thiết kế một cách tự động và chính xác hơn.

## Các MCP Server Figma có sẵn

Hiện có 4 MCP server community cho Figma:

### 1. **Figma Context MCP** (Khuyến nghị)
- **Repository**: https://github.com/GLips/Figma-Context-MCP
- **Mô tả**: Cung cấp quyền truy cập trực tiếp vào dữ liệu file Figma, giúp AI có thể triển khai thiết kế một cách chính xác
- **Tính năng**: Đọc và phân tích cấu trúc thiết kế Figma

### 2. **Figma MCP** 
- **Repository**: https://github.com/paulvandermeijs/figma-mcp
- **Mô tả**: Server nhanh để đọc và xuất file thiết kế Figma
- **Tính năng**: Đọc và export file Figma

### 3. **Figma to Flutter MCP**
- **Repository**: https://github.com/mhmzdev/figma-flutter-mcp
- **Mô tả**: Chuyển đổi design tokens và data từ Figma sang code Flutter
- **Tính năng**: Chuyên dụng cho Flutter development

### 4. **Talk To Figma**
- **Repository**: https://github.com/sonnylazuardi/cursor-talk-to-figma-mcp
- **Mô tả**: Cho phép LLMs tương tác với Figma để đọc và chỉnh sửa thiết kế
- **Tính năng**: Đọc và chỉnh sửa thiết kế qua code

## Cài đặt MCP Server Figma (Figma Context MCP)

### Bước 1: Chuẩn bị
Bạn cần:
- Node.js đã được cài đặt
- Figma Personal Access Token
- VS Code (hoặc Claude Desktop)

### Bước 2: Lấy Figma Access Token

1. Đăng nhập vào Figma
2. Truy cập: https://www.figma.com/developers/api#access-tokens
3. Tạo Personal Access Token mới
4. Sao chép token này (giữ bí mật)

### Bước 3: Cài đặt MCP Server

#### Cài đặt qua NPX (Khuyến nghị)

Không cần cài đặt gì trước, chỉ cần cấu hình trong VS Code.

#### Hoặc cài đặt global

```bash
npm install -g @glips/figma-context-mcp
```

### Bước 4: Cấu hình trong VS Code

Tạo hoặc chỉnh sửa file `.vscode/mcp.json` trong workspace của bạn:

```json
{
  "mcp": {
    "servers": {
      "figma": {
        "command": "npx",
        "args": [
          "-y",
          "@glips/figma-context-mcp"
        ],
        "env": {
          "FIGMA_ACCESS_TOKEN": "YOUR_FIGMA_TOKEN_HERE"
        }
      }
    }
  }
}
```

**Lưu ý**: Thay `YOUR_FIGMA_TOKEN_HERE` bằng token bạn đã tạo ở Bước 2.

### Bước 5: Khởi động lại VS Code

Sau khi cấu hình xong, khởi động lại VS Code để MCP server được kích hoạt.

## Cách sử dụng

### 1. Lấy URL file Figma

Mở file thiết kế trong Figma và copy URL, ví dụ:
```
https://www.figma.com/file/ABC123/My-Design?node-id=1%3A2
```

### 2. Sử dụng với GitHub Copilot trong VS Code

Khi làm việc với Copilot, bạn có thể hỏi:

```
"Hãy triển khai component button theo thiết kế trong file Figma: 
https://www.figma.com/file/ABC123/My-Design?node-id=1%3A2"
```

Copilot sẽ:
- Truy cập vào file Figma
- Phân tích cấu trúc thiết kế
- Tạo code React/Vue/... phù hợp với thiết kế

### 3. Các câu lệnh hữu ích

```
- "Phân tích layout của trang chủ trong file Figma..."
- "Tạo component Header dựa theo frame Header trong Figma..."
- "Lấy thông tin màu sắc và typography từ Figma design system..."
- "Export tất cả icons từ file Figma..."
```

## Các MCP Server khác cho Design

### Talk To Figma via Claude
Nếu bạn muốn tương tác trực tiếp hơn với Figma:

```json
{
  "mcp": {
    "servers": {
      "figma-interactive": {
        "command": "npx",
        "args": [
          "-y", 
          "cursor-talk-to-figma-mcp"
        ],
        "env": {
          "FIGMA_ACCESS_TOKEN": "YOUR_TOKEN"
        }
      }
    }
  }
}
```

## Xử lý sự cố

### Lỗi: Cannot find module
```bash
# Xóa cache và cài đặt lại
npm cache clean --force
npx -y @glips/figma-context-mcp
```

### Lỗi: Invalid token
- Kiểm tra lại Figma Access Token
- Đảm bảo token có quyền đọc file
- Token phải được đặt trong dấu ngoặc kép

### MCP Server không hoạt động
1. Mở Command Palette (Ctrl+Shift+P)
2. Chạy "MCP: Restart All Servers"
3. Kiểm tra logs trong Output panel

## Tài nguyên bổ sung

- [Figma API Documentation](https://www.figma.com/developers/api)
- [Model Context Protocol Docs](https://modelcontextprotocol.io)
- [MCP Servers Registry](https://github.com/modelcontextprotocol/servers)

## Lưu ý bảo mật

⚠️ **Quan trọng**: 
- Không commit file chứa FIGMA_ACCESS_TOKEN lên Git
- Thêm `.vscode/mcp.json` vào `.gitignore` 
- Sử dụng environment variables cho production
- Định kỳ rotate (thay đổi) access token

## Quy trình làm việc đề xuất

1. **Thiết kế** → Tạo design trong Figma
2. **Chia sẻ** → Copy URL file/frame Figma
3. **Code** → Dùng Copilot + MCP để generate code
4. **Review** → Kiểm tra và tinh chỉnh code
5. **Iterate** → Cập nhật design và sync lại code

---

Chúc bạn code hiệu quả với Figma MCP! 🚀
