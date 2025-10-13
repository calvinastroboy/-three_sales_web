#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
THREE 商品系列分析 Web 應用
Flask 後端主程序
"""

from flask import Flask, render_template, request, send_file, jsonify
from werkzeug.utils import secure_filename
import os
import sys
from datetime import datetime
import traceback

# 導入分析模組
from analyzer import SalesAnalyzer

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['OUTPUT_FOLDER'] = 'output'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# 允許的文件類型
ALLOWED_EXTENSIONS = {'xlsx', 'xls', 'pdf'}

def allowed_file(filename):
    """檢查文件類型是否允許"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    """首頁"""
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_files():
    """處理文件上傳和分析"""
    try:
        # 檢查文件是否存在
        if 'official' not in request.files or \
           'momo' not in request.files or \
           'pdf' not in request.files or \
           'category' not in request.files:
            return jsonify({
                'success': False,
                'error': '請上傳所有必需的文件'
            }), 400
        
        files = {
            'official': request.files['official'],
            'momo': request.files['momo'],
            'pdf': request.files['pdf'],
            'category': request.files['category']
        }
        
        # 檢查文件是否為空
        for key, file in files.items():
            if file.filename == '':
                return jsonify({
                    'success': False,
                    'error': f'{key} 文件為空'
                }), 400
            
            if not allowed_file(file.filename):
                return jsonify({
                    'success': False,
                    'error': f'{key} 文件類型不允許'
                }), 400
        
        # 保存文件
        saved_files = {}
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        
        for key, file in files.items():
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], f'{timestamp}_{key}_{filename}')
            file.save(filepath)
            saved_files[key] = filepath
        
        # 執行分析
        analyzer = SalesAnalyzer()
        result = analyzer.analyze(
            official_path=saved_files['official'],
            momo_path=saved_files['momo'],
            pdf_path=saved_files['pdf'],
            category_path=saved_files['category']
        )
        
        if not result['success']:
            return jsonify({
                'success': False,
                'error': result.get('error', '分析失敗')
            }), 500
        
        # 返回結果
        return jsonify({
            'success': True,
            'output_file': result['output_file'],
            'summary': result['summary'],
            'unclassified': result.get('unclassified', [])
        })
    
    except Exception as e:
        print(f"Error: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': f'處理失敗: {str(e)}'
        }), 500

@app.route('/download/<filename>')
def download_file(filename):
    """下載生成的報表"""
    try:
        filepath = os.path.join(app.config['OUTPUT_FOLDER'], filename)
        if not os.path.exists(filepath):
            return jsonify({
                'success': False,
                'error': '文件不存在'
            }), 404
        
        return send_file(
            filepath,
            as_attachment=True,
            download_name=f'商品系列分析_{datetime.now().strftime("%Y%m%d")}.xlsx'
        )
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'下載失敗: {str(e)}'
        }), 500

@app.route('/health')
def health():
    """健康檢查"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    # 確保必要的目錄存在
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
    
    # 從環境變數讀取端口（支援 Zeabur、Render 等平台）
    port = int(os.environ.get('PORT', 5000))
    
    # 啟動應用
    app.run(host='0.0.0.0', port=port, debug=False)

