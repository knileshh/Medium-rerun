import { Hono } from 'hono'
import { User } from '@prisma/client'
import { PrismaClient } from '@prisma/client/extension'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{  
  Bindings: {
  DATABASE_URL: string,
  JWT_SECRET: string
}}>()

app.post('/api/v1/user/signup', (c) => {

  const prima = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/singin', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})

export default app
