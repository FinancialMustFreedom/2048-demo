# 2048 with React in near

## 前言
这是一个2048小游戏，它目前集成了near链，可以使用near游玩，并获得near的奖励，这是一个练手项目主要为了探寻near链的使用和合约的开发。

## 安装部署
1. node环境`dnf install nodejs`或者ubuntu可以`apt install nodejs`
2. near-cli安装`npm install -g near-cli`
3. yarn安装`npm install -g yarn`
4. 部署合约`near dev-deploy main.wasm`
5. 起服务`cd server && yarn && yarn start`
6. 起游戏`yarn && yarn start`

## 整体交互逻辑
整体分为3部分：
1. 游戏：这个只是载体在这个项目中不重要
2. 合约：主要用来实现奖励near的作用

```bash
                       ┌─────────────────┐
                       │                 │
                       │                 │       2.won game will get near
     1.add access key  │    GAME         ├─────────────┐
           ┌───────────┤                 │             │
           │           └─────────────────┘             │
           │                                           │
           │                                           │
           ▼                                           │
     ┌───────────────────┐                    ┌────────▼─────────┐
     │                   │                    │                  │
     │                   │                    │                  │
     │                   │                    │                  │
     │    SERVER         │                    │      CONTRACT    │
     │                   ├───────────────────►│                  │
     └───────────────────┘                    └──────────────────┘
                            3.sign and transfer near

```


## near合约
在这个项目中,一部分用来给用户发放奖励，另一部分可以从nft项目中拉起自己的图片当游戏背景
主要代码
```rust
#[near_bindgen]
impl Drop {
    pub fn drop_transfer(&mut self, account_id: AccountId) {
        Promise::new(account_id).transfer(DROP_AMOUNT);
    }
}
```

### 合约的编译和部署
```bash
yarn && yarn start
```

