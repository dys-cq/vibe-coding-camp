from http.server import BaseHTTPRequestHandler
import os
import json
import requests

# 依然从环境变量获取 Key，Vercel 后台设置环境变量 ZHIPU_API_KEY
ZHIPU_API_KEY = os.environ.get("ZHIPU_API_KEY", "")
BASE_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            user_message = data.get('message', '')
            history = data.get('history', [])

            if not user_message:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Message is required'}).encode('utf-8'))
                return

            messages = []
            messages.append({"role": "system", "content": "你是一个乐于助人的 AI 助手，运行在 Vibe Coding 训练营的个人主页上。请用简练、友好的语气回答用户关于编程、AI 学习或日常闲聊的问题。"})
            
            for msg in history[-4:]:
                messages.append(msg)
                
            messages.append({"role": "user", "content": user_message})

            headers = {
                "Authorization": f"Bearer {ZHIPU_API_KEY}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "model": "glm-4-flash", 
                "messages": messages
            }

            response = requests.post(BASE_URL, headers=headers, json=payload)
            
            if response.status_code == 200:
                result = response.json()
                if 'choices' in result and len(result['choices']) > 0:
                    ai_reply = result['choices'][0]['message']['content']
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'reply': ai_reply}).encode('utf-8'))
                else:
                    self.send_response(500)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'Empty response from AI provider'}).encode('utf-8'))
            else:
                self.send_response(response.status_code)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'API Error', 'details': response.text}).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
