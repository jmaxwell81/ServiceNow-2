<?php
/**
 * autoload.php
 *
 * Magical autoloader for BITS\ServiceNow namespaced classes.
 *
 * PHP Version 5
 *
 * @category API
 * @package  ServiceNowAPI
 * @author   Andrew Teixeira <teixeira@broadinstitute.org>
 * @license  http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link     https://github.com/broadinstitute/servicenow-api
 */

spl_autoload_register(function($className) {
    if ($className[0] == '\\') {
        $className = substr($className, 1);
    }

    // Leave if class should not be handled by this autoloader
    if (strpos($className, 'BITS\\ServiceNow') !== 0) {
        return;
    }

    $classPath = strtr(substr($className, strlen('BITS\\ServiceNow')), '\\', '/') . '.php';

    if (file_exists(__DIR__ . $classPath)) {
        require __DIR__ . $classPath;
    } else {
        throw new BITS\ServiceNow\Exception("Cannot instantiate the $className class");
    }
});

?>
