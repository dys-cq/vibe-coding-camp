from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import json

app = Flask(__name__)
CORS(app)

# 使用同一个 Key
ZHIPU_API_KEY = os.environ.get("ZHIPU_API_KEY", "") # 请在部署时设置环境变量 ZHIPU_API_KEY
# 更改为 Coding 端点 (GLM-4-Plus 或 GLM-4-Coding 可能可用，但 Code 1113 通常是账号级别的余额问题)
# 这里尝试切换模型为免费的 glm-4-flash 以验证是否因为模型收费导致
BASE_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        history = data.get('history', [])

        if not user_message:
            return jsonify({'error': 'Message is required'}), 400

        messages = []
        messages.append({"role": "system", "content": "你是一个乐于助人的 AI 助手，运行在 Vibe Coding 训练营的个人主页上。请用简练、友好的语气回答用户关于编程、AI 学习或日常闲聊的问题。"})
        
        for msg in history[-4:]:
            messages.append(msg)
            
        messages.append({"role": "user", "content": user_message})

        headers = {
            "Authorization": f"Bearer {ZHIPU_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # 尝试使用 glm-4-flash (免费模型)
        payload = {
            "model": "glm-4-flash", 
            "messages": messages
        }

        response = requests.post(BASE_URL, headers=headers, json=payload)
        
        if response.status_code == 200:
            result = response.json()
            # 兼容不同返回结构
            if 'choices' in result and len(result['choices']) > 0:
                ai_reply = result['choices'][0]['message']['content']
                return jsonify({'reply': ai_reply})
            else:
                return jsonify({'reply': 'API 返回了空内容，请稍后再试。'})
        else:
            print(f"API Error: {response.text}")
            return jsonify({'error': 'API Error', 'details': response.text}), response.status_code

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
