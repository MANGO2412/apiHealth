import {Router} from "express"


const router=Router();


router.get('/',(req,res)=>{
     res.send("get all users")
});

router.get('/:id',(req,res)=>{
    const {id}=req.params;
    res.send('get a user '+id)
})

router.post('/new',(req,res)=>{

});

router.put('/update',(req,res)=>{

});

router.delete('/delete/:id',(req,res)=>{

});


export default router;