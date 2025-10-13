# THREE 商品系列分析系統 - Zeabur 部署指南

Zeabur 是一個現代化的應用部署平台，特別適合部署 Python Web 應用。本指南將帶您一步步完成部署。

## 🌟 為什麼選擇 Zeabur？

- ✅ **中文介面**：完整的繁體中文支援
- ✅ **免費額度**：每月提供免費使用額度
- ✅ **自動部署**：連接 GitHub 後自動部署
- ✅ **自動 HTTPS**：免費提供 SSL 證書
- ✅ **快速啟動**：5 分鐘內完成部署
- ✅ **台灣節點**：訪問速度快

## 📋 部署前準備

### 1. 註冊 Zeabur 帳號

訪問 [zeabur.com](https://zeabur.com/) 並註冊帳號（支援 GitHub 登入）。

### 2. 準備 GitHub 倉庫

您需要將應用代碼上傳到 GitHub：

#### 方法 A：使用 GitHub Desktop（推薦給新手）

1. 下載並安裝 [GitHub Desktop](https://desktop.github.com/)
2. 登入您的 GitHub 帳號
3. 點擊「File」→「Add Local Repository」
4. 選擇 `three_sales_web` 資料夾
5. 點擊「Publish repository」
6. 取消勾選「Keep this code private」（或保持私有，Zeabur 都支援）
7. 點擊「Publish repository」

#### 方法 B：使用命令列

```bash
cd three_sales_web

# 初始化 Git 倉庫
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 在 GitHub 上創建新倉庫，然後執行：
git remote add origin https://github.com/您的用戶名/three-sales-web.git
git branch -M main
git push -u origin main
```

### 3. 準備必要文件

確保 `three_sales_web` 目錄中包含以下文件（已經包含）：

- ✅ `requirements.txt` - Python 依賴
- ✅ `app.py` - Flask 應用主程序
- ✅ `Dockerfile` - Docker 配置（可選）

## 🚀 開始部署

### 步驟 1：登入 Zeabur

1. 訪問 [zeabur.com](https://zeabur.com/)
2. 點擊右上角「登入」
3. 使用 GitHub 帳號登入

### 步驟 2：創建新專案

1. 點擊「創建專案」或「New Project」
2. 輸入專案名稱：`three-sales-analyzer`（或您喜歡的名稱）
3. 選擇地區：**Taiwan (台灣)** 或 **Hong Kong (香港)**
4. 點擊「創建」

### 步驟 3：部署服務

1. 在專案頁面，點擊「部署新服務」或「Deploy New Service」
2. 選擇「Git」
3. 選擇「GitHub」
4. 授權 Zeabur 訪問您的 GitHub（首次需要）
5. 選擇 `three-sales-web` 倉庫
6. 點擊「部署」

### 步驟 4：配置服務

Zeabur 會自動檢測到這是一個 Flask 應用，並自動配置。

**如果需要手動配置**：

1. 點擊已部署的服務
2. 進入「設定」或「Settings」
3. 確認以下配置：
   - **框架**：Python (Flask)
   - **建置命令**：`pip install -r requirements.txt`
   - **啟動命令**：`flask run --host=0.0.0.0 --port=$PORT`
   - **端口**：5000

### 步驟 5：設定環境變數（可選）

如果需要設定環境變數：

1. 在服務頁面，點擊「變數」或「Variables」
2. 添加以下變數：
   ```
   FLASK_ENV=production
   ```

### 步驟 6：生成公開網址

1. 在服務頁面，點擊「網域」或「Domains」
2. 點擊「生成網域」或「Generate Domain」
3. Zeabur 會自動生成一個網址，例如：`three-sales-analyzer.zeabur.app`
4. 也可以綁定自己的網域（需要在網域商設定 DNS）

### 步驟 7：等待部署完成

- 部署通常需要 2-5 分鐘
- 您可以在「日誌」或「Logs」中查看部署進度
- 看到「Running on http://0.0.0.0:5000」表示部署成功

### 步驟 8：訪問應用

1. 點擊生成的網址，例如：`https://three-sales-analyzer.zeabur.app`
2. 您應該能看到 THREE 商品系列分析系統的首頁
3. 測試上傳文件和生成報表功能

## ✅ 部署完成！

現在您的團隊成員可以通過這個網址訪問系統了。

---

## 🔄 更新應用

當您修改代碼後，如何更新 Zeabur 上的應用？

### 自動更新（推薦）

1. 修改本地代碼
2. 使用 GitHub Desktop 或命令列提交並推送到 GitHub：
   ```bash
   git add .
   git commit -m "更新說明"
   git push
   ```
3. Zeabur 會自動檢測到更新並重新部署
4. 等待 2-3 分鐘，更新完成

### 手動觸發部署

1. 在 Zeabur 服務頁面
2. 點擊「重新部署」或「Redeploy」
3. 等待部署完成

---

## 💰 費用說明

### 免費額度

Zeabur 提供免費額度，包括：
- **計算資源**：每月一定的 CPU 和記憶體使用時間
- **流量**：每月一定的網路流量
- **建置時間**：每月一定的建置時間

對於小團隊（5-10 人）的日常使用，免費額度通常足夠。

### 付費方案

如果超出免費額度，Zeabur 會按使用量計費：
- **計算資源**：按實際使用的 CPU 和記憶體計費
- **流量**：按實際使用的網路流量計費

您可以在 Zeabur 控制台查看當前用量和預估費用。

---

## 🔧 常見問題

### Q1: 部署失敗，顯示「找不到 requirements.txt」

**解決方案**：
1. 確認 `requirements.txt` 文件在專案根目錄
2. 確認文件名拼寫正確（全小寫）
3. 重新提交到 GitHub 並觸發部署

### Q2: 應用啟動失敗，顯示「Port already in use」

**解決方案**：
修改 `app.py` 的最後一行：
```python
# 原來的代碼
app.run(host='0.0.0.0', port=5000, debug=True)

# 改為
import os
port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port, debug=False)
```

### Q3: 上傳文件後顯示「500 Internal Server Error」

**解決方案**：
1. 在 Zeabur 查看「日誌」，找到錯誤訊息
2. 常見原因：
   - 缺少 `uploads` 和 `output` 目錄
   - PDF 解析失敗
   - 分類定義文件未上傳

**修復**：在 `app.py` 的 `if __name__ == '__main__':` 部分確保創建目錄：
```python
os.makedirs('uploads', exist_ok=True)
os.makedirs('output', exist_ok=True)
```

### Q4: 想要使用自己的網域

**解決方案**：
1. 在 Zeabur 服務頁面，點擊「網域」
2. 點擊「添加自訂網域」
3. 輸入您的網域，例如：`sales.yourcompany.com`
4. 按照提示在您的網域商（如 GoDaddy、Cloudflare）設定 CNAME 記錄
5. 等待 DNS 生效（通常 5-30 分鐘）

### Q5: 如何查看應用日誌？

**解決方案**：
1. 在 Zeabur 服務頁面
2. 點擊「日誌」或「Logs」
3. 可以看到應用的即時日誌輸出
4. 可以用來排查錯誤

---

## 🔒 安全性建議

### 1. 添加基本認證

如果您希望限制訪問，可以添加簡單的密碼保護：

在 `app.py` 中添加：

```python
from functools import wraps
from flask import request, Response

def check_auth(username, password):
    """檢查用戶名和密碼"""
    return username == 'admin' and password == 'your_password'

def authenticate():
    """發送 401 響應"""
    return Response(
        '需要登入', 401,
        {'WWW-Authenticate': 'Basic realm="Login Required"'}
    )

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

# 在路由上添加裝飾器
@app.route('/')
@requires_auth
def index():
    return render_template('index.html')
```

### 2. 限制文件大小

已經在 `app.py` 中設定：
```python
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB
```

### 3. 定期清理上傳文件

添加定時任務清理舊文件，避免佔用過多儲存空間。

---

## 📊 監控和維護

### 查看使用統計

1. 在 Zeabur 專案頁面
2. 點擊「分析」或「Analytics」
3. 可以看到：
   - 請求數量
   - 響應時間
   - 錯誤率
   - 資源使用情況

### 設定告警

1. 在 Zeabur 專案頁面
2. 點擊「告警」或「Alerts」
3. 設定告警條件，例如：
   - 錯誤率超過 5%
   - 響應時間超過 5 秒
   - 記憶體使用超過 80%

---

## 🎯 優化建議

### 1. 使用持久化儲存

Zeabur 的容器重啟後，`uploads` 和 `output` 目錄會被清空。

**解決方案**：
- 使用 Zeabur 的 Volume 功能掛載持久化儲存
- 或者將文件上傳到 S3 / Google Cloud Storage

### 2. 添加快取

如果分類定義不常變化，可以快取在記憶體中：

```python
from functools import lru_cache

@lru_cache(maxsize=1)
def load_category_definition(filepath):
    return pd.read_excel(filepath)
```

### 3. 使用生產級 WSGI 伺服器

在 `requirements.txt` 中添加：
```
gunicorn==21.2.0
```

修改啟動命令為：
```bash
gunicorn -w 4 -b 0.0.0.0:$PORT app:app
```

---

## 📞 獲取幫助

如果遇到部署問題：

1. **查看 Zeabur 文檔**：[docs.zeabur.com](https://docs.zeabur.com/)
2. **Zeabur Discord 社群**：[discord.gg/zeabur](https://discord.gg/zeabur)
3. **GitHub Issues**：在您的倉庫中提交 Issue

---

## ✅ 部署檢查清單

在部署前，請確認：

- [ ] 代碼已上傳到 GitHub
- [ ] `requirements.txt` 包含所有依賴
- [ ] `app.py` 中的端口配置正確
- [ ] 已創建 Zeabur 帳號
- [ ] 已授權 Zeabur 訪問 GitHub
- [ ] 已選擇正確的倉庫
- [ ] 已生成公開網址
- [ ] 已測試上傳和下載功能

---

祝您部署順利！🎉

如果這份指南對您有幫助，請分享給需要的同事。

