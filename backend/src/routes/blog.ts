import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@avglinuxguy/common'


export const blogRouter = new Hono<{  
    Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
    }, 
    Variables: {
        userId: string;
    }    
}>()

  blogRouter.use("/*", async (c, next) => {

   try{
    const authHeader =  c.req.header("authorization") || "" //if undefined default to empty string.    

    const user = await verify(authHeader, c.env.JWT_SECRET)

    if(user){
        c.set("userId", user.id);
        await next();
    }else {
        return c.json({
            message: "You're not loggedin"
        })
    }

    next()
   }catch(e){
    return c.json({error: e})
   }
  })

  blogRouter.post('/', async (c) => {

   try{
    const body =  await c.req.json()

    const success = createBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            error: "Can't post blog"
        })
    }

    const authorId = c.get("userId")
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    

    const blog = await prisma.blog.create({ //create returns creation id always
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
        }
    })

    return c.json({
        id: blog.id
    })
   }catch(e){
    return c.json({error: e})
   }

  })
  
  blogRouter.put('/', async (c) => {
    const body = await c.req.json()

    const success = updateBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            error: "Can't update blog"
        })
    }
    
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
    
        const update = await prisma.blog.update({ 
            where: {
                id: body.id
            },
            data:{
                title: body.title,
                content: body.content,
            }
        })

        return c.json({
            id: update.id
        })
    }catch(e){
        return c.json({
            error: e
        })
    }

   
  })

//Todo: add pagination not all needed at once
  
  blogRouter.get('/bulk', async (c) => {

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
    
        const blogs = await prisma.blog.findMany()
    
        return c.json({
            blogs
        })
    }catch{
        c.status(411);
        return c.json({
            message: "Error while fetching all blogs"
        })
    }
    
  })

  
  blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    //we need to check for the param for the id
    
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
    
        const blog = await prisma.blog.findFirst({ //create returns creation id always
            where:{
                id: Number(id)
            }
        })
    
        return c.json({
            blog
        })
    }catch{
        c.status(411);
        return c.json({
            message: "Error while fetching the blog post"
        })
    }
  })

