import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{  
  Bindings: {
  DATABASE_URL: string,
  JWT_SECRET: string
}}>()

app.post('/api/v1/user/signup', async (c) => {

  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();

  try{
    await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
      }
    })

    return c.text('Hiiiiiii Signup')
  } catch(e){
    c.status(411)
    return c.json({
      "error": e
    })
  }
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
