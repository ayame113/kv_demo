# 鍵

Deno KVを使用したスマートキーのデモ

### アイディア

- ブラウザのLocalStorageにユーザーIDを、サーバーのデータベース(Deno
  KV)にユーザーIDのSHA-256ハッシュ値を保存する。
- 鍵を操作するときは、ブラウザのLocalStorageにある値をサーバーに送信し、そのハッシュ値が登録済みのものであれば解錠/施錠ができる。
- ユーザーIDに紐づく値としてユーザー名を設定できる。
- アクセストークンを知っている者のみユーザー登録ページにアクセスでき、ユーザー登録が可能となる。

### ページ

- トップページ: `/`
  - LocalStorageに保存されたユーザーIDを使用して解錠と施錠の操作ができる。
- ユーザー登録ページ: `/register?token=＜アクセストークン＞`
  - 端末を登録する。ユーザーIDを生成し、ブラウザのLocalStorageとサーバーに保存する。以降、LocalStorageに保存されたユーザーIDを使用して施錠・解錠操作を行うことができる。アクセストークンがバレたら終わり。
- 解錠ページ: `/open`
  - LocalStorageに保存されたユーザーIDを使用して解錠し、3秒後にトップページに移動する。
  - QRコードやNFCリーダーからの立ち上げを想定。
- 施錠ページ: `/close`
  - LocalStorageに保存されたユーザーIDを使用して施錠し、3秒後にトップページに移動する。
  - QRコードやNFCリーダーからの立ち上げを想定。

### API

- ユーザー登録: POST `/api/register`
  - request body: `{ token: "＜アクセストークン＞" }`
  - response body:
    `{ success: true|false, userId: "＜新しいユーザーID＞"|null }`
  - アクセストークンを知っている人だけがユーザー登録できる。アクセストークンがバレたら終わり。
- ユーザー削除: POST `/api/delete`
  - request body: `{ userId: "＜ユーザーID＞", token: "＜アクセストークン＞" }`
  - response body: `{ success: true|false }`
  - アクセストークンを知っている人だけがユーザー削除できる。アクセストークンがバレたら終わり。
- 解錠: POST `/api/open`
  - request body: `{ userId: "＜ユーザーID＞" }`
  - response body: `{ success: true|false }`
  - 登録されたユーザーIDを持っている人だけが解錠できる。
- 施錠: POST `/api/close`
  - request body: `{ userId: "＜ユーザーID＞" }`
  - response body: `{ success: true|false }`
  - 登録されたユーザーIDを持っている人だけが施錠できる。
- ユーザー名変更: POST `/api/set_name`
  - request body: `{ userId: "＜ユーザーID＞", name: "＜新しいユーザー名＞" }`
  - response body: `{ success: true|false }`
  - 登録されたユーザーIDを持っている人だけがユーザー名を変更できる。
- ユーザー名取得: GET `/api/get_name`
  - request query parameter: `?userId=＜ユーザーID＞`
  - response body: `{ success: true|false, name: "＜ユーザー名＞"|null }`
  - 登録されたユーザーIDを持っている人だけがユーザー名を取得できる。

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
