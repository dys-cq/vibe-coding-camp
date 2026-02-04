import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, TrendingUp, Code2, Database, 
  BrainCircuit, Rocket, Mail, MapPin,
  Linkedin, Github, Youtube, Moon, Sun, Search, MessageSquare, BookOpen,
  Flame, FileText, PartyPopper, PenTool, User, RefreshCw, Video, Trophy
} from 'lucide-react';
import AIChatFloat from './AIChatFloat';

function App() {
  const [darkMode, setDarkMode] = useState(false); // Default to light mode for cleaner look
  const [showCommentModal, setShowCommentModal] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const lessons = [
    { name: '第1课：大势不可逆，得势者必胜', url: 'https://waytoagi.feishu.cn/wiki/YVC3wnT3NixTF1kVC5RckX16ney' },
    { name: '第2课：从 Website 开始构建一款应用产品', url: 'https://waytoagi.feishu.cn/wiki/TlFlwYnpbiWjdlky8QFcpgzdnrb' },
    { name: '第3课：与时俱进做出你的第一款 AI 应用', url: 'https://waytoagi.feishu.cn/wiki/IowDwmesfiXqGzkmVsrc4Qzzndf' },
    { name: '第4课：AI编程下一站，走入代码的世界', url: 'https://waytoagi.feishu.cn/wiki/FhetwCksdiTML6kNf9XcsCCRnWg' },
    { name: '第5课：和Al一起vibe coding做产品', url: 'https://waytoagi.feishu.cn/wiki/BXkewy6eNi2Yymko9fkcS29Pnkd' },
    { name: '第6课：把产品交付到真实世界', url: 'https://waytoagi.feishu.cn/wiki/BbtiwFvMKi3gwykmXDKcjs9InDg' },
    { name: '第7课：一个工具产品是怎么做出来的', url: 'https://waytoagi.feishu.cn/wiki/C9K2wEj4Mi8LYzkkk5Hcxcy1nib' },
    { name: '第8课：你的数字化毕业展', url: 'https://waytoagi.feishu.cn/wiki/AvWwwM1Sdi0mTdkShKScjWDRnQ9' }
  ];

  const projects = [
    {
      title: '热搜捕手',
      desc: '自动追踪与分析热门话题趋势',
      url: 'https://wei1ht66sc.feishu.cn/wiki/Ytukw0mSUiWUrikpY5vcXHDXnbf?from=from_copylink',
      icon: <Flame size={24} />
    },
    {
      title: 'PRD生成器',
      desc: 'AI 驱动的产品需求文档生成工具',
      url: 'https://wei1ht66sc.feishu.cn/wiki/FcfvwPud9iMi3skvcaWcjsNDnJh',
      icon: <FileText size={24} />
    },
    {
      title: '新年贺卡&运势占卜',
      desc: '趣味性 AI 互动应用',
      url: 'https://wei1ht66sc.feishu.cn/wiki/XjKGwN9RriEJiVkJ22rcWeAvnXc',
      icon: <PartyPopper size={24} />
    },
    {
      title: '应用文模板',
      desc: '提高工作效率的文本生成技能',
      url: 'https://wei1ht66sc.feishu.cn/wiki/E3OgwW8S6iAhE6kOxPCccNVGnWb',
      icon: <PenTool size={24} />
    },
    {
      title: '个人主页',
      desc: '展示个人作品与技能的门户',
      url: 'https://wei1ht66sc.feishu.cn/wiki/NmAnwXdHBifmYTkjumpcMgAYnxe?fromScene=spaceOverview',
      icon: <User size={24} />
    },
    {
      title: '主页更新及部署',
      desc: 'CI/CD 自动化部署实践',
      url: 'https://wei1ht66sc.feishu.cn/wiki/BoKBw41yui1AxEkXFM3cal16nHc?fromScene=spaceOverview',
      icon: <RefreshCw size={24} />
    },
    {
      title: '视频文案提取',
      desc: '快速验证市场需求的MVP',
      url: 'https://wei1ht66sc.feishu.cn/wiki/R5AHweggbiCnGzkUMeDcU0iInfb?fromScene=spaceOverview',
      icon: <Video size={24} />
    },
    {
      title: '成就展示',
      desc: '记录与分享我的编程学习之旅',
      url: 'https://wei1ht66sc.feishu.cn/wiki/IBTrwl1f4iFleQktGcjcOvzHnQe?fromScene=spaceOverview',
      icon: <Trophy size={24} />
    }
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-black selection:text-white ${darkMode ? 'bg-[#1a1a1a] text-gray-200' : 'bg-[#f8f9fa] text-gray-900'}`}>
      
      {/* Navigation - Lobe UI Style (Glassmorphism + Rounded) */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-50 px-6 py-4 backdrop-blur-xl border shadow-sm rounded-full flex justify-between items-center transition-all hover:shadow-md ${
        darkMode 
          ? 'bg-black/70 border-white/20 hover:bg-black/80' 
          : 'bg-white/70 border-white/40 hover:bg-white/80'
      }`}>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
             <Code2 size={18} strokeWidth={3} />
           </div>
           <span className={`font-bold text-lg tracking-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>Vibe Coding</span>
        </div>
        
        <div className={`hidden md:flex items-center gap-1 p-1 rounded-full border ${
          darkMode ? 'bg-white/10 border-white/10' : 'bg-gray-100/50 border-gray-200/50'
        }`}>
           <a href="#projects" className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
             darkMode ? 'text-gray-300 hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-white hover:text-black hover:shadow-sm'
           }`}>学习成果</a>
           <a href="#lessons" className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
             darkMode ? 'text-gray-300 hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-white hover:text-black hover:shadow-sm'
           }`}>课程列表</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-white/10 text-white' : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setShowCommentModal(true)}
            className={`px-5 py-2 rounded-full text-sm font-bold active:scale-95 transition-all flex items-center gap-2 ${
              darkMode 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-500/20'
            }`}
          >
            <Mail size={14} />
            <span>联系我</span>
          </button>
        </div>
      </nav>

      {/* Hero Section - Lobe UI Style */}
      <section className="pt-40 pb-24 px-6 max-w-[1200px] mx-auto text-center relative overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr blur-[100px] -z-10 rounded-full opacity-60 ${
          darkMode ? 'from-cyan-900/30 via-purple-900/30 to-pink-900/30' : 'from-cyan-200/30 via-purple-200/30 to-pink-200/30'
        }`}></div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
           <a href="https://www.waytoagi.com/zh" target="_blank" className={`inline-block p-1 rounded-2xl shadow-xl mb-8 hover:scale-105 transition-transform duration-500 cursor-pointer ${
             darkMode ? 'bg-[#2a2a2a] shadow-black/50' : 'bg-white shadow-gray-200/50'
           }`}>
             <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 rounded-xl flex items-center justify-center text-5xl">
               🌈
             </div>
           </a>
           
           <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
             Vibe Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">训练营</span>
           </h1>
           <p className={`text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
             我的学习成就展。<br/>
             <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>AI 学习 · 找搭子 · 做项目</span>
           </p>

           <div className="flex justify-center gap-3 flex-wrap">
             {[
               { href: "https://mp.weixin.qq.com/s/E_COyR1f9ircRTBFqWf_2g", label: "公众号", icon: <MessageSquare size={18}/> },
               { href: "https://v.douyin.com/xEOrxU7lyHE/", label: "抖音", icon: <Youtube size={18}/> },
               { href: "https://space.bilibili.com/33801162", label: "Bilibili", icon: <Youtube size={18}/> },
               { href: "https://xhslink.com/m/46vkhsnUNy8", label: "小红书", icon: (
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                   <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12ZM7.5 12C7.5 12.8284 8.17157 13.5 9 13.5H15C15.8284 13.5 16.5 12.8284 16.5 12C16.5 11.1716 15.8284 10.5 15 10.5H9C8.17157 10.5 7.5 11.1716 7.5 12Z" fill="currentColor" />
                   <path d="M18 7.5H6V16.5H18V7.5Z" fill="currentColor"/>
                 </svg>
               ) }
             ].map((link, idx) => (
               <a 
                 key={idx}
                 href={link.href}
                 target="_blank"
                 className={`px-6 py-3 rounded-xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2 font-semibold ${
                   darkMode 
                     ? 'bg-[#2a2a2a] border-white/5 text-gray-300 hover:text-white hover:bg-[#333]' 
                     : 'bg-white border-gray-100 text-gray-700'
                 }`}
               >
                 {link.icon}
                 {link.label}
               </a>
             ))}
           </div>
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <section className="px-6 pb-32 max-w-[1200px] mx-auto space-y-32">
        
        {/* Projects Grid - Card Style */}
        <div id="projects">
          <div className="flex items-center gap-4 mb-12">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>学习成果</h2>
            <div className={`h-px flex-1 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.url}
                target="_blank"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                className={`group relative rounded-3xl p-6 border shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full overflow-hidden ${
                  darkMode 
                    ? 'bg-[#2a2a2a] border-white/5' 
                    : 'bg-white border-gray-100'
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform ${
                  darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                }`}>
                  {project.icon}
                </div>
                
                <h3 className={`text-lg font-bold mb-2 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 flex-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {project.desc}
                </p>
                
                <div className="flex items-center text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                  查看项目 →
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Lessons List - Clean List Style */}
        <div id="lessons">
          <div className="flex items-center gap-4 mb-12">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>课程列表</h2>
            <div className={`h-px flex-1 ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson, index) => (
              <motion.a
                key={index}
                href={lesson.url}
                target="_blank"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${
                  darkMode 
                    ? 'bg-[#2a2a2a] border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10' 
                    : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                  darkMode 
                    ? 'bg-white/10 text-gray-400 group-hover:bg-blue-500 group-hover:text-white' 
                    : 'bg-gray-50 text-gray-400 group-hover:bg-blue-500 group-hover:text-white'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold transition-colors line-clamp-1 ${
                    darkMode ? 'text-gray-200 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-700'
                  }`}>
                    {lesson.name}
                  </h3>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-1 ${
                  darkMode ? 'text-gray-600 group-hover:text-blue-400' : 'text-gray-300 group-hover:text-blue-500'
                }`}>
                  →
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className={`py-12 text-center border-t ${darkMode ? 'bg-[#121212] border-white/10' : 'bg-white border-gray-200'}`}>
        <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>© 2026 Nice哥. All rights reserved.</p>
      </footer>

      {/* Comment Modal - Lobe Style */}
      <AnimatePresence>
        {showCommentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-white/60 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCommentModal(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl shadow-blue-900/10 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
              
              <button 
                onClick={() => setShowCommentModal(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
              
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">给我们留言</h3>
                <p className="text-gray-500 mt-2">发送消息，我们会尽快回复。</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-1 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                    placeholder="您的昵称"
                  />
                </div>
                <div className="bg-gray-50 p-1 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                  <textarea 
                    rows="4"
                    className="w-full px-4 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 resize-none"
                    placeholder="请输入留言内容..."
                  ></textarea>
                </div>
                
                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all">
                  发送留言
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AIChatFloat />
    </div>
  );
}

export default App;