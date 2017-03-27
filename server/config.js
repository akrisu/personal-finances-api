module.exports.setConfig = function() {
    process.env.MONGOOSE_CONNECT = 'mongodb://localhost:8081/pefi';
    process.env.SECRET_KEY = 'secretkey';
}
