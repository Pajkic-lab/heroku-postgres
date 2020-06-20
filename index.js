const express = require('express')
const app = express()
const cors = require("cors")
const pool = require('./database')
const path = require('path')
const PORT = process.env.PORT || 5000



app.use(cors())
app.use(express.json({ extended: false }))



if(process.env.NODE_ENV === "production") {
    //app.use(express.static(path.join(__dirname, "client/build")))
    app.use("/", express.static("./client/build"))
  }



app.get('/db', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.log(err)
    }
})

app.post('/db', async (req, res) => {
    try {
        const description = req.body.data
        const post = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(post.rows[0])
    } catch (err) {
        console.log(err)
    }
} )

app.delete('/db', async (req, res) => {
    try { 
        const id = req.body.id
        await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json(id)
    } catch (err) {
        console.log(err)
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html")) 
  })


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

