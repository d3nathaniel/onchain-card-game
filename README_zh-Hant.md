
# On-chain Card Game

[English](README.md) | [简体中文](README_zh-CN.md) | [日本語](README_ja.md) | [繁體中文](README_zh-Hant.md)

## 安裝依賴

```bash
npm install
```

## 編譯合約

```bash
npx hardhat compile
```

## 部署合約到本地 hardhat 節點

```bash
npx hardhat node
```

另開一個終端，運行部署指令：

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## 遊玩指令行遊戲

```bash
npx hardhat run scripts/play.js --network localhost
```

---

**問：這個遊戲中的 ID 和 Power 與傳統撲克牌有什麼不同？**  
**答：**

- **ID**：是卡牌的唯一識別碼，根據建立順序從 1 開始遞增，與傳統撲克牌的花色與點數無關。
- **Power**：是一個介於 0 到 99 的隨機值，代表卡牌的能力值。撲克牌的點數則是固定不變的。

**差異原因：**

- 傳統撲克牌只有固定的 52 張牌。
- 此遊戲中的卡牌可以無限生成，且每張卡牌的 Power 值皆為隨機。

**若想讓遊戲更像撲克牌：**

可將 Power 限制為 1-13，並新增花色屬性（0-3 對應四種花色）。

## 遊戲命令

- `draw`: 抽取一張新卡牌（最多5張）
- `view`: 查看你的卡牌收藏
- `accounts`: 列出所有可用帳戶
- `switch <索引>`: 切換到不同的帳戶（例如，`switch 1` 切換到帳戶 #1）
- `exit`: 退出遊戲

## 多玩家模式

遊戲通過不同的以太坊帳戶支持多玩家。每個帳戶都有自己的卡牌收藏。使用 `accounts` 命令查看可用帳戶，使用 `switch <索引>` 在帳戶之間切換。

## 重置你的卡牌

