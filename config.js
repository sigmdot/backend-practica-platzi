module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'secreto'
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'sql10.freesqldatabase.com',
        user: process.env.MYSQL_USER || 'sql10393262',
        password: process.env.PASS || 'KPFF9nbaxK',
        database: process.env.MYSQL_DB || 'sql10393262',     
        
    },
    mysqlService:{
        host: process.env.MYSQL_SRVC_HOST || 'localhost',
        port: process.env.MYSQL_SRVC_PORT || 3001,
    },
    post:{
        host: process.env.POST_HOST || 'localhost',
        port: process.env.POST_PORT || 3002,
    }
}