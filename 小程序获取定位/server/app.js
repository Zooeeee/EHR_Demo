const express = require('express')
const app = express();
//解析json文件所用的 bodyParser
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
	extended: true
}));


app.get('/', (req, res) => res.send("hello"))


app.post('/msg', (req, res) => console.log(req))

app.listen(3000, () => console.log('Example app listening on port 3000!'))