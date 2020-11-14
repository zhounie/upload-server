const fs = require('fs')

const autoMkdir = (path) => {
    return new Promise((resolve, reject) => {
        const paths = path.split('/')
        let str = ''
        paths.map(async (item) => {
            str += `${item}/`
            try {
                await fs.statSync(str)
            } catch (error) {
                try {
                    await fs.mkdirSync(str)
                } catch (error2) {
                    reject(error2)
                }
            }
        })
        resolve(null)
    })
}

module.exports = {
    autoMkdir
}
