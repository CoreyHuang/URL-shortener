# 短網址轉換
### 可以把過長的網址透過此網站縮小網址的長度，並點選傳送頁面。
### 網站是由node.js與express共同打造的，並使用mongoose作資料操作。

---
![image](https://github.com/CoreyHuang/URL-shortener/blob/master/home.png)
### Features(功能描述):
+ 使用者可以瀏覽網址輸入頁面。
+ 使用者可以輸入想縮短的網址名稱。
+ 使用者可以點擊畫面按鈕並轉換網址。
+ 使用者可以點擊導覽列進去初始網址。
+ 使用者可以點擊短網址直接連結目標網址。


### installation and execution(安裝與執行步驟):
#### `<安裝步驟>`
#### 1. 安裝git
```
https://git-scm.com/download/win
```
#### 2. 安裝nvm
```
Enter https://github.com/coreybutler/nvm-windows/releases
Click nvm-setup.zip to install
```
#### 3. 安裝node.js與使用指定版本
```
nvm install 10.15.0
nvm use 10.15.0
```
#### 4. 安裝npm nodemon
```
npm install -g nodemon
```

#### `<執行步驟>`
#### 1. 使用terminal下載專案
```
git clone https://github.com/CoreyHuang/URL-shortener.git
```
#### 2. 安裝npm套件(package.json)
```
npm install
```
#### 4. 開啟本地伺服(專案資料夾中)
```
nodemon app.js or npm run dev
```
#### 5. 執行
```
URL: http://localhost:3000/
```

### Prerequisites(環境建置與需求):
#### `<安裝需求>` : 版本為記錄用，並非必須
 1. git : v2.27.0.windows.1
 2. nvm : v1.1.7
 3. node : v10.15.0
 4. npm : v6.4.1
 5. nodemon : v2.0.4
#### `<npm套件>`
 1. express : v4.17.1
 2. express-handlebars : v5.1.0
 3. mongoose : v5.9.25
 4. body-parser : v1.19.0

