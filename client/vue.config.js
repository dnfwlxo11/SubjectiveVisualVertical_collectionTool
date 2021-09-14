module.exports = {
    devServer: {
        proxy: {
            '/data': {
                target: 'http://localhost:3001'
            }
        }
    }
}