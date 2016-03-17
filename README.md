This is the website of www.alpgauer.de
It runs with AngularJS, uses a service to load a captcha created with a php script and uses php to send mail.
The website runs in html5mode and can be crawled by search engines. 
As it uses a php script to create a captcha, run it with a xamp installation. 
Start your browser with localhost/alpgauer

Deploy

---++ gulp deploy --nv=prod
Bumps the version and copies a runable version to the dist folder that can be copied to the productive webserver´s document root

---++ gulp --nv=test
Copies a version into the dist folder that can be tested with localhost/alpgauer/dist