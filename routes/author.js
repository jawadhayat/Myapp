const express = require('express')
const router = express()
const Author = require('../models/author')


//all authors routes
router.get('/',async(req,res)=>{
    let searchOption = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOption.name = new RegExp(req.query.name ,'i')
    }
    try{
        const authors =await Author.find(searchOption)
        res.render("author/index",{
            authors: authors,
            searchOption:req.query
        })
    }catch(error){
        res.redirect('/')
    }
})

//all authors routes
router.get('/new',(req,res)=>{
    res.render("author/new",{author: new Author()})
    })

//create authors routes
router.post('/',async(req,res)=>{
    const author = new Author({
        name:req.body.name
    })
    try{
        const newAuthor =await author.save()
         // res.redirect(`author/${newAuthor.id}`)
            res.redirect(`author`)
    }catch(error){
        res.render('author/new',{
                        author:author,
                        errorMessage :'error in creating author'
                    })
    }

    // author.save((err,newAuthor)=>{
    //     if(err){
    //         res.render('author/new',{
    //             author:author,
    //             errorMessage :'error in creating author'
    //         })
    //     }else{
    //         // res.redirect(`author/${newAuthor.id}`)
    //         res.redirect(`author`)

    //     }
    // })
    
    })

module.exports = router