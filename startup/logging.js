require('winston-mongodb');
const winston=require('winston');
require('express-async-errors');

module.exports = function(){
winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({colorize:true,prettyPrint:true}),
            new winston.transports.File({
            filename: "./logs/errors.log",
            handleExceptions: true,
            handleRejections: true,
            }),
        ],
    });
    
    winston.add(new winston.transports.File({filename: './logs/logfile.log'}));
    
    winston.add( new winston.transports.MongoDB({
        db: 'mongodb://127.0.0.1:27017/playground',
        options: { useUnifiedTopology: true },
        metaKey: 'meta'
      })
    );
}