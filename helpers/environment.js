
const environments = {};

environments.staging = {
    PORT : 3000,
    envName : 'staging',
    secret : 'shdhsh2322'
}

environments.production = {
    PORT : 5000,
    envName : 'production',
    secret : 'shdhsh2322'

}

const currentEnvName = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

const envToExport = typeof(environments[currentEnvName]) === 'object' ? environments[currentEnvName] : environments.staging;

//console.log(envToExport);

module.exports = envToExport;