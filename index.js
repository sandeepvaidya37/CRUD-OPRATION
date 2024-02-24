const express=require("express");
const app = express();
const path = require("path");

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

const port=8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

let posts=[
    {
      id: uuidv4(),
      username:"Sandeep Vaidya",
      content:"Hello!",
      image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      comments:["good", "very nice"

      ]

    },
    {
      id: uuidv4(),
        username:"Rahul Yadav",
        content:"Good morning gys!",
        image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        comments:["hello", "good morning"
  
        ]
        
      },
      {
        id: uuidv4(),
        username:"Kuldeep Vaidya",
        contents:"this is my new post",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        comments:["good post", "new post is good"
  
        ]
        
      },
      {
        id: uuidv4(),
        username:"Vaibhav yadav",
        content:"good night gys",
        image:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        comments:["good night", "good morning here"
  
        ]
        
      },
      {
        id: uuidv4(),
        username:"Sonu Vaidya",
        content:"Hellow very nice post",
        image:"https://images.unsplash.com/photo-1614204424926-196a80bf0be8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        comments:["good bhai", "very nice post everyone"
  
        ]
        
      },
];

app.get("/", (req, res)=>{
  
    res.render("index.ejs", {posts});
});

app.get("/post", (req, res)=>{
  res.render("newpost.ejs");

});

app.post("/", (req, res)=>{
  let {username, content, image, cmt}=req.body;
  let newId=uuidv4();
  posts.push({id:newId, username:username, content:content, image:image, comments:[cmt]});
  res.redirect("http://localhost:8080/");
   
});

app.get("/:id/edit", (req, res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>p.id===id);
  res.render("edit.ejs", {post});

});

app.patch("/:id", (req, res)=>{
  let {id}=req.params;
  let {content, image}=req.body;
  let post=posts.find((p)=>p.id===id);
  post.content= content;
  post.image=image;
  
  res.redirect("http://localhost:8080/");


});

app.delete("/:id", (req, res)=>{
     let {id}=req.params;
     posts=posts.filter((p)=>id !== p.id);
     res.redirect("http://localhost:8080/");
});

app.get("/:id", (req, res)=>{
  let {id}=req.params;
  let post=posts.find((p)=>p.id==id);

  let num = post.comments.length;

  res.render("post.ejs", {post, num});

});

app.listen(port, ()=>{
    console.log(`listening to the port ${port}`);
})