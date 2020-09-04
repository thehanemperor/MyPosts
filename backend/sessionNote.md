# Notes for Cookie Session

when running 
```js
    req.session!.userId = user.id
    {userId: 1} -> sent to redis
```
after that 

1. redis is a key-value store database. it assigns {userId:1} a key -> sess: randomletters -> {userId:1}
2. express-session will set a cookie on browser "random cookie letters"
3. when user makes request,"random cookie letters" sent to server 
4. server unsign/decrypt the "random cookie letters" -> "sess: randomletters"

5. make a request to redis

