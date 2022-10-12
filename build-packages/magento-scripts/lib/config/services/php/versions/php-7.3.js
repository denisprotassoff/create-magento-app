const path = require('path');
const { repo } = require('../base-repo');
const xdebug = require('../extensions/xdebug');

/**
 * @returns {import('../../../../typings/index').PHPConfiguration}
 */
const php73 = ({
    templateDir,
    extensions = {},
    baseImage = `${ repo }:php-7.3`
} = {}) => ({
    baseImage,
    debugImage: `${ baseImage }-debug`,
    configTemplate: path.join(templateDir || '', 'php.template.ini'),
    fpmConfigTemplate: path.join(templateDir || '', 'php-fpm.template.conf'),
    debugTemplate: path.join(templateDir || '', 'php-debug.template.ini'),
    extensions: {
        xdebug,
        ...extensions
    }
});

module.exports = php73;