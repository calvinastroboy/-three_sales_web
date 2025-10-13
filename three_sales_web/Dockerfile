# 使用官方 Python 鏡像
FROM python:3.9-slim

# 設置工作目錄
WORKDIR /app

# 複製依賴文件
COPY requirements.txt .

# 安裝依賴
RUN pip install --no-cache-dir -r requirements.txt

# 複製應用代碼
COPY . .

# 暴露端口
EXPOSE 5000

# 設置環境變量
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# 啟動命令
CMD ["flask", "run"]

