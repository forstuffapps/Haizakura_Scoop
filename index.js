import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgrespwd",
  port: 5432,
});

db.connect();




app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

  app.get("/order_success", (req, res) => {
    res.render("order_success.ejs");
  });

  app.get("/index", (req, res) => {
    res.render("index.ejs");
  });

  app.get("/media", (req, res) => {
    res.render("media.ejs");
  });

  app.get("/specials", (req, res) => {
    res.render("specials.ejs");
  });

  app.get("/team", (req, res) => {
    res.render("team.ejs");
  });

  app.get("/training", (req, res) => {
    res.render("training.ejs");
  });

app.get("/order", (req, res) => {
  res.render("order.ejs");
});

app.get("/contact", (req, res) => {
    res.render("order.ejs");
  });

app.post("/order", async (req, res) => {
    //console.log(req.body)
    
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email
  const item = req.body.item
  const cup = req.body.cup_size
  const comments = req.body.comments
  try{
        const result = await db.query(`INSERT INTO ice_cream_orders (firstname, lastname, email, item, cup, extra_comments) VALUES('${firstname}', '${lastname}', '${email}',
        '${item}', '${cup}', '${comments}')`);
        console.log(result)
        res.render("order.ejs") 
  }
  catch(err)
  {
    console.log(err)
  }
  
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
