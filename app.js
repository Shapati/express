const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app =express()


const dbURI = 'mongodb+srv://Daniel:daniel2003@shapatitut.amg02.mongodb.net/shapatitut?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true})
.then((result)=>app.listen(4000))
.catch((err)=> console.log(err))
//register view engine

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


//sandbox routes
app.get('/add-blog',(req,res)=>{
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body:'more about my new blog'
  })

  blog.save()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})


app.get('/all-blogs',(req,res)=>{
  Blog.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})


app.get('/single-blog',(req,res)=>{
  Blog.findById('')
})



app.get('/',(req,res)=>{
  res.redirect('/blogs')
})

app.get('/blogs', (req,res)=>{
    Blog.find()
      .then((result)=>{
        res.render('index', {title:'All Blogs', blogs: result})      
      })
      .catch((err)=>{
        console.log(err)
      })
})

app.use((req,res,next)=>{
  console.log('next middleware');
  next();
})

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body)

    blog.save()
      .then((results)=>{
        res.redirect('/')
      })
})

app.get('/about',(req,res)=>{
  res.render('about',{title: 'About'})
})
app.get('/blogs/create',(req,res)=>{
  res.render('create',{title: 'Create new blog'})
})
app.use((req,res)=>{
  res.status(404).res.render('404',{title: '404'})
})


