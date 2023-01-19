const express = require('express');
const port = 5000
const app = express();
const connectDB = require("./config/db")
const userRouter = require('./controllers/User')

const postsRouter = require('./controllers/Posts')
const authRouter = require('./controllers/auth')
const profileRouter = require('./controllers/Profile')
const friendsRouter = require('./controllers/Friends')
const notificationRouter = require('./controllers/Notification')

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

connectDB()
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))



app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});


app.use('/user',userRouter)

app.use('/posts',postsRouter)
app.use('/auth',authRouter)
app.use('/profile',profileRouter)
app.use('/friends',friendsRouter)
app.use('/notification',notificationRouter)







app.listen(port, () => console.log(`Server is Working ${port}`))