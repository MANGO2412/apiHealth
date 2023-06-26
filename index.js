import app from './src/app.js'


const port = process.env.PORT || 3000;
const server=app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

