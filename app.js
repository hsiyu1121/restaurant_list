const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");
const port = 3000;

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// index 位置
app.get('/', (req, res)=>{
  res.render('index', {restaurant:restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res)=>{
  const restaurant = restaurantList.results.find(restaurant=> restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {restaurant:restaurant})
})

app.get('/search', (req, res)=>{
  console.log(req.query)
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', {restaurant:restaurant})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
