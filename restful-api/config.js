/*
* Create and export configuration variables
* 
*/

const environments = {};

// Staging {default} environment
environments.staging = {
    'port': 3000,
    'envName': 'staging',
};

// Production environment
environments.production = {
    'port': 5000,
    'envName': 'production',
};

const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? 
    process.env.NODE_ENV.toLocaleLowerCase() : '';

const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ?
    environments[currentEnvironment] : environments.staging;


module.exports = environmentToExport;