// THREE 商品系列分析系統 - 前端邏輯

document.addEventListener('DOMContentLoaded', function() {
    // 獲取DOM元素
    const uploadForm = document.getElementById('uploadForm');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const progressSection = document.getElementById('progressSection');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const resultSection = document.getElementById('resultSection');
    const errorSection = document.getElementById('errorSection');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // 文件輸入元素
    const fileInputs = {
        official: document.getElementById('official'),
        momo: document.getElementById('momo'),
        pdf: document.getElementById('pdf'),
        category: document.getElementById('category')
    };
    
    // 當前輸出文件名
    let currentOutputFile = null;
    
    // 監聽文件選擇
    Object.keys(fileInputs).forEach(key => {
        const input = fileInputs[key];
        const nameSpan = document.getElementById(`${key}-name`);
        const statusDiv = document.getElementById(`${key}-status`);
        const card = input.closest('.upload-card');
        
        input.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                nameSpan.textContent = file.name;
                statusDiv.textContent = '✓ 已選擇';
                statusDiv.className = 'upload-status success';
                card.classList.add('has-file');
            } else {
                nameSpan.textContent = '未選擇文件';
                statusDiv.textContent = '';
                statusDiv.className = 'upload-status';
                card.classList.remove('has-file');
            }
        });
    });
    
    // 表單提交
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 檢查所有文件是否已選擇
        let allFilesSelected = true;
        Object.keys(fileInputs).forEach(key => {
            if (fileInputs[key].files.length === 0) {
                allFilesSelected = false;
            }
        });
        
        if (!allFilesSelected) {
            alert('請選擇所有必需的文件');
            return;
        }
        
        // 禁用按鈕
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = '處理中...';
        
        // 隱藏結果和錯誤區域
        resultSection.style.display = 'none';
        errorSection.style.display = 'none';
        
        // 顯示進度區域
        progressSection.style.display = 'block';
        updateProgress(10, '正在上傳文件...');
        
        try {
            // 準備FormData
            const formData = new FormData();
            Object.keys(fileInputs).forEach(key => {
                formData.append(key, fileInputs[key].files[0]);
            });
            
            updateProgress(30, '文件上傳完成，開始分析...');
            
            // 發送請求
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            
            updateProgress(60, '正在處理數據...');
            
            const result = await response.json();
            
            if (result.success) {
                updateProgress(100, '分析完成！');
                
                // 延遲顯示結果
                setTimeout(() => {
                    showResult(result);
                }, 500);
            } else {
                throw new Error(result.error || '分析失敗');
            }
        } catch (error) {
            console.error('Error:', error);
            showError(error.message);
        } finally {
            // 恢復按鈕
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<span class="btn-icon">🚀</span>執行分析';
        }
    });
    
    // 下載按鈕
    downloadBtn.addEventListener('click', function() {
        if (currentOutputFile) {
            window.location.href = `/download/${currentOutputFile}`;
        }
    });
    
    // 更新進度
    function updateProgress(percentage, text) {
        progressBar.style.width = percentage + '%';
        progressText.textContent = text;
    }
    
    // 顯示結果
    function showResult(result) {
        progressSection.style.display = 'none';
        resultSection.style.display = 'block';
        
        currentOutputFile = result.output_file;
        
        // 顯示摘要
        const summary = result.summary;
        document.getElementById('totalAmount').textContent = 
            formatCurrency(summary.total_amount);
        
        // 顯示各分類數據
        const summaryGrid = document.getElementById('summaryGrid');
        summaryGrid.innerHTML = '';
        
        summary.categories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'summary-item';
            item.innerHTML = `
                <div class="summary-item-name">${cat.name}</div>
                <div class="summary-item-amount">${formatCurrency(cat.amount)}</div>
                <div class="summary-item-percentage">${cat.percentage}%</div>
                <div class="summary-item-details">
                    官網: ${formatCurrency(cat.official)}<br>
                    MOMO: ${formatCurrency(cat.momo)}<br>
                    美麗台: ${formatCurrency(cat.skm)}
                </div>
            `;
            summaryGrid.appendChild(item);
        });
        
        // 顯示未分類產品
        if (result.unclassified && result.unclassified.length > 0) {
            const unclassifiedCard = document.getElementById('unclassifiedCard');
            const unclassifiedList = document.getElementById('unclassifiedList');
            
            unclassifiedCard.style.display = 'block';
            unclassifiedList.innerHTML = '';
            
            result.unclassified.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="unclassified-source">${item.source}</span>
                    ${item.name}
                `;
                unclassifiedList.appendChild(li);
            });
        } else {
            document.getElementById('unclassifiedCard').style.display = 'none';
        }
        
        // 滾動到結果區域
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 顯示錯誤
    function showError(message) {
        progressSection.style.display = 'none';
        errorSection.style.display = 'block';
        document.getElementById('errorMessage').textContent = message;
        
        // 滾動到錯誤區域
        errorSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 格式化金額
    function formatCurrency(amount) {
        return new Intl.NumberFormat('zh-TW', {
            style: 'currency',
            currency: 'TWD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
});

