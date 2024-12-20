import express from 'express'
const app = express()
const port = 3000


// middleware

app.use(express.json())

// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
//   })

const users = []

app.get('/', (req, res) => {
  res.send('Hello world!')
})

// add new user

app.post("/user" , (req , res) =>{
      const {title} = req.body;
      if (!title) {
        res.status(400).json({
            message: "title is required",
        });
        return;
      }
      users.push({
        title,
        id: Date.now()
      })
      res.status(201).json({
        message: "User is created",
       data: users,
      })
});

// get all user
app.get("/users" , (req , res) =>{
    res.status(200).json({
        data: users,

    })
})

// get single user
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }

  res.status(200).json({
    data: users[index],
  });
});



// delete user

app.delete("/users/:id" , (req , res) =>{
    
  const {id} = req.params;

  const index = users.findIndex((item) =>{
    return item.id === +id;
  })
   
  if (index === -1) {
    res.status(404).json({
      message: "no user found"
    })
    return
  }
   users.splice(index , 1);
   res.status(200).json({
    message: "user deleted succesfully",
     data: users
   });
});


// edit user


app.put("/users/:id" , (req , res) =>{

  const {id} = req.params;
  const {title} = req.body;

  const index = users.findIndex(item => item.id === +id)
  
  if (index === -1) {
    res.status(404).json({
      message: "No user Found"
    })
    return
  }
  if (!title) {
    res.status(400).json({
        message: "title is required",
    });
    return;
  }
  users[index].title = title;
   res.status(200).json({
    message: "user edited succesfully",
    data: users,

   })
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})