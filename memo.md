# メモ

## コンソール
`heroku console`で`rails c`が見れる。
(どこかのプロセスにattachしてる?)

https://stackoverflow.com/questions/15526776/its-possible-to-delete-a-row-in-heroku-postgresql


## DB見るには

https://data.heroku.com/dataclips

## 環境変数観るには

```
heroku run printenv
```

## DB初期設定メモ

```
heroku addons:create heroku-postgresql
```

## やったこと

* herokuにアプリ登録

* productionのgroupでpg(postgreアダプター)gemを追加

* `heroku config:set BUNDLE_WITHOUT="development:test"`をした
  * https://devcenter.heroku.com/articles/bundler

* `heroku addons:create heroku-postgresql`をした

* `heroku run bundle exec ridgepole -c config/database.yml -E production --apply`

