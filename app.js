const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = Router() 
const fs = require('fs')
const path = require('path')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const { autoMkdir } = require('./utils/index')

app.use(KoaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}))

app.use(KoaStatic(path.join(__dirname, '/data/')))

router.post('/upload', async (ctx) => {
    if (!ctx.request.files) {
        return ctx.body = {
            code: 99,
            msg: '请上传文件，参数: file'
        }
    }
    const { file } = ctx.request.files
    if (!file) {
        return ctx.body = {
            code: 99,
            msg: '请上传文件，参数: file'
        } 
    }
    await autoMkdir('./data/images')
    const name = `${new Date().getTime()}${file.name}`;
    const reader = fs.createReadStream(file.path)
    let filePath = path.resolve(__dirname, './data/images/', name)
    const upStream = fs.createWriteStream(filePath)
    reader.pipe(upStream)
    return ctx.body = {
        code: 200,
        data: {
            img: `http://81.69.28.107:6868/images/${name}`
        }
    }
})

app.use(router.routes())


app.listen(6868, () => {
  console.log('server listen: ' + 6868);  
})