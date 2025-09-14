import express from 'express'

const app = express();

// app.get('/',(req,res)=>{
//     res.send("Server is Readdy");
// });
app.use(express.static('dist'))


app.get('/api/jokes',(req,res)=>{
    
const jokes = [
  {
    id: 1,
    setup: "Why don't skeletons fight each other?",
    punchline: "Because they don't have the guts!"
  },
  {
    id: 2,
    setup: "Why did the math book look sad?",
    punchline: "Because it had too many problems."
  },
  {
    id: 3,
    setup: "Why can't your nose be 12 inches long?",
    punchline: "Because then it would be a foot!"
  },
  {
    id: 4,
    setup: "What do you call fake spaghetti?",
    punchline: "An impasta."
  },
  {
    id: 5,
    setup: "Why did the computer go to the doctor?",
    punchline: "Because it caught a virus."
  }
]

res.send(jokes)

})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server Running at http://localhost:${port}`);
})