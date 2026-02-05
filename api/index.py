from http.server import BaseHTTPRequestHandler
import os
import json
import urllib.request
import urllib.error

# ZhipuAI Config
ZHIPU_API_KEY = os.environ.get("ZHIPU_API_KEY", "49febb5ce1bf4563bc9c15bd710d1c11.3sSNr8Z2tGqMCIlt")
BASE_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions"

class handler(BaseHTTPRequestHandler):
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
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Message is required'}).encode('utf-8'))
                return

            messages = [{"role": "system", "content": "你是一个乐于助人的 AI 助手，运行在 Vibe Coding 训练营的个人主页上。请用简练、友好的语气回答用户关于编程、AI 学习或日常闲聊的问题。"}]
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

            req = urllib.request.Request(BASE_URL, data=json.dumps(payload).encode('utf-8'), headers=headers, method='POST')
            
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode('utf-8'))
                if 'choices' in result and len(result['choices']) > 0:
                    ai_reply = result['choices'][0]['message']['content']
                    self.send_response(200)
                else:
                    ai_reply = 'API 返回了空内容，请稍后再试。'
                    self.send_response(200)
                
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*') # 重要：CORS
                self.end_headers()
                self.wfile.write(json.dumps({'reply': ai_reply}).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
