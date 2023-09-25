const notFound=(req,res,next)=>{
    const error=new Error(`Not Found- ${req.originalUrl}`)
    error.status=404
    next(error)
}

const errorHandler=(err,req,res,next)=>{
    const status=err.status||401;
    // console.log(status)
    res.status(status).json({
        error:err.message
    })
}
module.exports={notFound,errorHandler}