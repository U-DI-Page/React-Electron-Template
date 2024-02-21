const https = require('https');

// 目标接口URL
const url = 'https://fhwcswdyj.dglietou.com/bm/bmjg.js?_='+Date.now();

// 设置请求选项
const options = {
  method: 'GET',
  headers: {
    // 在这里添加其他请求头部，如Referrer等
  },
};

// 发起请求
const req = https.request(url, options, (res) => {
  // 响应处理
  let data = '';

  // 数据块接收中
  res.on('data', (chunk) => {
    data += chunk;
  });

  // 响应结束处理
  res.on('end', () => {
    console.log('Response:', data);
  });
});

// 请求错误处理
req.on('error', (error) => {
  console.error('Error:', error.message);
});

// 结束请求
req.end();
