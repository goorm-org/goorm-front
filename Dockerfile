# 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN pnpm install

# 소스 코드 복사 및 빌드
COPY . .
RUN pnpm run build

# 실행 스테이지
FROM node:20-alpine AS runner
WORKDIR /app

# curl 설치 (헬스체크용)
RUN apk add --no-cache curl

# 필요한 파일만 복사
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# 서버 실행
EXPOSE 3000
CMD ["npm", "run", "start"] 