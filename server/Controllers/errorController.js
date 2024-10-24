const devErrors=(err,res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stackTrace: err.stack,
        error: err    
    })
    
}

const prodErrors=(err,res)=>{
    if(isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else{
        res.status(500).json({
            status: 'error',
            message: "Something went wrong. Please try again."
        })
    }
}

module.exports= (err,req,res,next)=>{
    err.statusCode= err.statusCode || 500;
    err.status= err.status || 'error';
    if(process.env.NODE_ENV= "development"){
        devErrors(err,res);
    }
    else{
        prodErrors(err,res);
    }
}