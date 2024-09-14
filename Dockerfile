# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY . .

# Build Next.js application
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built assets and necessary files from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules

# Copy Next.js configuration files
COPY --from=build /app/next.config.js ./
COPY --from=build /app/next-env.d.ts ./
COPY --from=build /app/tsconfig.json ./

EXPOSE 3000

CMD ["npm", "start"]
