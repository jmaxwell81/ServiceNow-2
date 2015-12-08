<?php

/**
 * Incident.php
 *
 * PHP Version 5
 *
 * @category API
 * @package  ServiceNowAPI
 * @author   Andrew Teixeira <teixeira@broadinstitute.org>
 * @license  http://opensource.org/licenses/gpl-license.php GNU Public License
 * @link     https://github.com/broadinstitute/servicenow-api
 */

namespace BITS\ServiceNow\ITIL;

use BITS\ServiceNow\ITIL\Object;

/**
 * The ServiceNow Incident class
 *
 * This is the class for working with incident data in ServiceNow
 *
 * @category  API
 * @package   ServiceNowAPI
 * @author    Andrew Teixeira <teixeira@broadinstitute.org>
 * @copyright 2013 Broad Institute
 * @license   http://opensource.org/licenses/gpl-license.php GNU Public License
 * @version   Release: 1.0.0
 * @link      https://github.com/broadinstitute/servicenow-api
 */
class Incident extends Object
{

    /**
     * Default constructor
     *
     * @param string $username The username with which to login.
     * @param string $password The password with which to login.
     * @param string $url      The base ServiceNow URL without the specific WSDL
     * path.
     *
     * @access public
     */
    public function __construct($username, $password, $url)
    {
        // Prevent stomping on sub-classes
        if (!preg_match('/WSDL/', $url)) {
            $this->_sysClassName = 'incident';
            $url = $url . "/" . $this->_sysClassName . ".do?WSDL";
        }

        parent::__construct($username, $password, $url);
    }
}
?>
