# 開発は軽さよりDX優先で公式 Node イメージ
FROM node:22-alpine

# 文字化け対策など必要なら適宜追加
WORKDIR /app

# 依存のキャッシュ最適化
COPY nono_magari/package.json nono_magari/package-lock.json* ./
RUN npm ci

# ソースは bind mount するので最小限コピー
EXPOSE 3000
ENV PORT=3000 \
    HOST=0.0.0.0 \
    # Docker 環境で稀に監視が効かない場合の保険
    WATCHPACK_POLLING=true

CMD ["npm", "run", "dev"]
