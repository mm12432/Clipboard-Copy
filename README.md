# Clipboard Copy (Chrome Extension) V1.0.0

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

## 简介

本项目起因是客户需要在 B/S 系统中录入本人的电子签名，需要与电子签名硬件设备连接。经研究发现，电子签名设备形成的 image 是通过系统剪切板与 windows 系统进行交互。

然而 chrome 浏览器只能在 paste 事件中获取 clipboard 中的内容，并且无法在`自定义`的 paste 事件中获取 clipboard 中的内容，搜索了很多文章，也没发现已有的解决方案。

于是尝试用 extension 的方式来解决获取 clipboard 内容的问题，最后确定了可以在 background.js 中执行`document.execCommand("paste")`来模拟 paste 事件，问题得以解决。

## 客户端示例代码

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>读取剪切板demo</title>
  </head>
  <body>
    <div>
      <img id="pic" />
    </div>
    <div id="text"></div>
    <button onclick="loadTextClipboard()">测试读取剪切板文字</button>
    <button onclick="loadImgClipboard()">测试读取剪切板图片</button>
  </body>
  <script>
    function loadTextClipboard() {
      window.postMessage({ type: "text", id: "text" }, "*");
    }
    function loadImgClipboard() {
      window.postMessage({ type: "image", id: "pic" }, "*");
    }
  </script>
</html>
```
其中message的参数对象，type可取值`text`和`image`；id为待接收clipboard内容的dom元素的id（`image`的接收dom只能为`img`）

## Chrome 安装

1. 下载项目的 zip 文件，在右上方有个 `Download ZIP`, 解压到本地

2. chrome 右上角的设置按钮下找到更多工具，打开`扩展程序`

3. 选择 `加载已解压的扩展程序`(如果没有显示先选中`开发者模式`)，选中解压后的文件夹，完成！

## 更新日志

`2019-06-25`

- 完成基本功能

## License

MIT
