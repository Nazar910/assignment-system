module.exports = function getConfig(nconf) {
    const { NODE_ENV } = process.env;
    nconf.file(require.resolve(`../../config/${NODE_ENV}.json`));
    nconf.env();
    return nconf;
}
