/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


 // Register React components

require('./components/App');
require('./components/Home');
require('./components/Navbar');
require('./components/auth/Register');
require('./components/auth/Login');
require('./components/project/CreateProject');
require('./components/project/ProjectSettings');
require('./components/user/UserProfile');
require('./components/user/ChangePassword');
require('./components/group/AddWorkers');
require('./components/group/Groups');
require('./components/group/GroupOperations');
require('./components/group/Workers');
require('./components/group/Worker');
require('./components/group/PasswordReset');
require('./components/project/Project');
require('./components/project/AddTask');
require('./components/project/Task');
require('./components/project/WorkerTask');
