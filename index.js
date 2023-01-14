const express=require('express')
const app= express()
const bodyParser=require('body-parser')
const Sequelize=require('sequelize')
const port=8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const  sequelize = new Sequelize('resturant_db','root','',{
    dialect:"mysql",

});

const blog_table= sequelize.define("blog_table",{
    
    hallname: Sequelize.STRING,
    tablename:Sequelize.TEXT,
    tablenumber:Sequelize.STRING,
    numberofpeople:Sequelize.STRING,

},{tableName:"blog_table"})

 blog_table.sync();




sequelize.authenticate().then(()=>{
    console.log("connection succesfully")
}).catch((err)=>{
    console.log(err,"this has error")
})


app.get("/",async(req,res)=>{
   const alldata=await blog_table.findAll()
   res.json(alldata)
});

app.put("/:id",(req,res)=>{
    const data=req.body.data;
    blog_table.update(
        {
           desc:data,
    },
    {
        where:{
            id:req.params.id,
        },
    }
   
    );
    res.redirect('/')
});

app.delete("/:id",(req,res)=>{
    
    blog_table.destroy(
        {
            where:{
                id:req.params.id
            },

        }
    );
    res.redirect("/")
})

app.post('/',async(req,res)=>{
    const hallname=req.body.hallname;
    const tablename=req.body.tablename;
    const tablenumber=req.body.tablenumber;
    const numberofpeople=req.body.numberofpeople;
    const saveBlog=blog_table.build({
        hallname,
        tablename,
        tablenumber,
        numberofpeople

    })
    await saveBlog.save();
    res.send("data posted succesfully")
})

app.listen(port,()=>{
    console.log(`server starts at http://localhost:${port}`);
});
