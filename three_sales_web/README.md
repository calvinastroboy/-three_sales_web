# THREE 商品系列分析 Web 應用

這是一個完整的 Web 應用，讓您的團隊可以輕鬆上傳銷售數據文件，並自動生成標準化的商品系列分析報表。應用基於 Flask 框架開發，並提供多種部署方式。

## ✨ 主要功能

- **網頁介面**：提供美觀、易用的網頁介面，引導用戶上傳文件。
- **多文件上傳**：支援同時上傳官網、MOMO、美麗台和分類定義四個文件。
- **自動分析**：後端自動執行數據清理、產品匹配、分類統計等所有分析流程。
- **即時反饋**：通過進度條和狀態文字即時反饋處理進度。
- **結果展示**：在網頁上直接展示業績總覽和未分類產品列表。
- **報表下載**：一鍵下載完全符合您樣板格式的 Excel 報表。
- **錯誤處理**：清晰地提示文件格式錯誤、缺失文件等問題。
- **跨平台**：可在 Windows、macOS、Linux 上運行和部署。

## 📂 項目結構

```
three_sales_web/
├── app.py                # Flask 應用主程序
├── analyzer.py           # 核心分析邏輯模組
├── requirements.txt      # Python 依賴列表
├── templates/
│   └── index.html        # 前端 HTML 頁面
├── static/
│   ├── css/style.css     # CSS 樣式文件
│   └── js/main.js        # JavaScript 交互邏輯
├── uploads/              # 用戶上傳的文件存儲目錄
├── output/               # 生成的報表存儲目錄
├── 分類定義.xlsx         # 您的分類規則文件（示例）
├── Dockerfile            # Docker 部署文件
└── docker-compose.yml    # Docker Compose 部署文件
```

## 🚀 快速開始（本地運行）

有兩種方式可以在您的電腦上運行此應用：

### 方案 A：使用 Docker（推薦）

**前提**：您的電腦已安裝 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。

1.  **啟動 Docker**：打開 Docker Desktop 應用。
2.  **解壓文件**：將 `three_sales_web.zip` 解壓到您喜歡的位置。
3.  **打開終端**：
    -   **Windows**: 打開 PowerShell 或命令提示字元（cmd）。
    -   **macOS**: 打開「終端機」（Terminal）應用。
4.  **進入項目目錄**：
    ```bash
    cd path/to/three_sales_web
    ```
    （將 `path/to/` 替換為您解壓的路徑）
5.  **啟動應用**：
    ```bash
    docker-compose up --build
    ```
6.  **訪問應用**：打開瀏覽器，訪問 `http://localhost:5000`

**優點**：一鍵啟動，無需關心 Python 環境和依賴安裝，最簡單可靠。

### 方案 B：手動安裝 Python 依賴

**前提**：您的電腦已安裝 [Python 3.8+](https://www.python.org/downloads/)。

1.  **解壓文件**：同上。
2.  **打開終端**：同上。
3.  **進入項目目錄**：同上。
4.  **創建虛擬環境**（推薦）：
    ```bash
    python -m venv venv
    ```
5.  **激活虛擬環境**：
    -   **Windows**:
        ```bash
        .\venv\Scripts\activate
        ```
    -   **macOS / Linux**:
        ```bash
        source venv/bin/activate
        ```
6.  **安裝依賴**：
    ```bash
    pip install -r requirements.txt
    ```
7.  **啟動應用**：
    ```bash
    flask run
    ```
8.  **訪問應用**：打開瀏覽器，訪問 `http://localhost:5000`

## 📝 使用方法

1.  **打開網頁**：訪問 `http://localhost:5000`。
2.  **選擇文件**：
    -   點擊「官網數據」區域，選擇您的 `商品分析.xlsx` 文件。
    -   點擊「MOMO 數據」區域，選擇您的 `S1201Report.xls` 或 `.xlsx` 文件。
    -   點擊「美麗台數據」區域，選擇您的 `採購單.pdf` 文件。
    -   點擊「分類定義」區域，選擇您的 `分類定義.xlsx` 文件。
3.  **執行分析**：點擊「🚀 執行分析」按鈕。
4.  **查看結果**：
    -   頁面會顯示處理進度。
    -   完成後，會展示業績總覽和未分類產品列表。
5.  **下載報表**：點擊「📥 下載 Excel 報表」按鈕，即可獲取標準格式的報表。

## ☁️ 部署到雲端（供團隊使用）

您可以將此應用部署到雲端伺服器，讓團隊成員通過網路訪問。

### 推薦平台

-   **Heroku**: 免費方案適合小型應用，部署簡單。
-   **Render**: Heroku 的替代品，提供免費的 Web Service 方案。
-   **DigitalOcean / Linode / AWS EC2**: 更靈活的雲端主機，需要一些伺服器管理知識。

### Render 部署示例

1.  **註冊 Render**：訪問 [render.com](https://render.com/) 並註冊帳號。
2.  **Fork 項目**：將此項目上傳到您的 GitHub 帳號。
3.  **創建 Web Service**：
    -   在 Render 後台，點擊「New +」→「Web Service」。
    -   連接您的 GitHub 帳號，並選擇此項目。
    -   **Name**: `three-sales-analyzer` (或您喜歡的名稱)
    -   **Environment**: `Python`
    -   **Build Command**: `pip install -r requirements.txt`
    -   **Start Command**: `gunicorn app:app`
4.  **點擊「Create Web Service」**。
5.  等待幾分鐘，Render 會自動完成部署。
6.  使用 Render 提供的 `xxx.onrender.com` 網址即可訪問。

## 🔧 客製化與維護

### 更新分類規則

-   **最簡單的方式**：直接在網頁上傳更新後的 `分類定義.xlsx` 文件即可。
-   **永久更新**：如果您希望應用內置最新的分類規則，可以替換項目根目錄下的 `分類定義.xlsx` 文件，然後重新部署應用。

### 調整產品匹配邏輯

-   產品匹配的邏輯位於 `analyzer.py` 文件的 `find_category` 方法中。
-   您可以調整 `standardize_name` 方法來改變名稱標準化的方式。
-   您可以調整 `calculate_similarity` 方法或 `find_category` 中的相似度閾值（目前是 `0.5`）來改變匹配的靈敏度。

### 修改 PDF 解析邏輯

-   目前 `analyzer.py` 中的 `load_pdf_data` 方法是**硬編碼**的，因為自動解析 PDF 格式變化較大，可靠性不高。
-   如果您需要自動化解析，可以引入 `pdfplumber` 或 `tabula-py` 庫，並在 `load_pdf_data` 中實現解析邏輯。
-   **注意**：這需要一定的編程知識，並且在 PDF 格式變更時需要同步修改代碼。

---

*本應用由 Manus AI 提供技術支持。*

