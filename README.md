
# About Lenshub
  Lenshub is supposed web application that enables gadget owners, film makers, photographers, cinematographers e.t.c give out the gadgets and equipments for rent. It links both the renters and those renting the items a means to solve the problems of cost for delivering a project and gadget investment.

## LOGIN DETAILS
####  To obtain the highest priviledge you will need to log in as an admin.

####  To Log in as an admin use the following details. Admin has all the priviledges possible

    email: emmanuelezenagu5@gmail.com
    Password: abcd1234

####  To Log in as a user you can create a user or admin having logged in as an admin by granting them a level access of 500 when creating a new user

## Configured Enviroment Variables

    APP_NAME=
    APP_ENV=
    APP_KEY=
    APP_DEBUG=
    APP_URL=

    DB_CONNECTION=
    DB_HOST=
    DB_PORT=
    DB_DATABASE=
    DB_USERNAME=
    DB_PASSWORD=

    MAIL_MAILER=
    MAIL_HOST=
    MAIL_PORT=
    MAIL_USERNAME=
    MAIL_PASSWORD=
    MAILGUN_DOMAIN=
    MAILGUN_SECRET=
    MAIL_ENCRYPTION=
    MAIL_FROM_ADDRESS=
    MAIL_FROM_NAME=


## Containerizing the application with Docker

    Once you have gotten a version of the application file you can execute the following steps to build and
    run the application.  


####  Ensure your .env file configuration for your DB_HOST matches the name of your database service in this case ours is "db"

    DB_CONNECTION=mysql
    DB_HOST=db
    DB_PORT=3306
    DB_DATABASE=superagent
    DB_USERNAME=root
    DB_PASSWORD=superagent


####  Build the app image with the following command:

    docker-compose build app

####  When the build is finished, you can run the environment in background mode with:

    docker-compose up -d

####  To will run your containers in the background. To show information about the state of your active services, run:

    docker-compose ps

####  Your environment should now be up and running, but you still need to execute a couple commands to finish setting up the application.
#### You can use the docker-compose exec command to execute commands in the service containers, such as an ls -l to show detailed information about files in the application directory:

    docker-compose exec app ls -l

####  We’ll now run composer install to install the application dependencies:

    docker-compose exec app composer install



####  The last thing we need to do before testing the application is to generate a unique application key with the artisan Laravel #  command-line tool. This key is used to encrypt user sessions and other sensitive data:

    docker-compose exec app php artisan key:generate


####   You will need to run migration so your database schema can be created in the databse, but first in the directory, clear the

    php artisan cache:clear

    docker-compose exec app php artisan migrate

####  Run a seed commend to populate the database with an initial user(Admin) to login, but first clear any previous cached data



    docker-compose exec app php artisan db:seed



####  Now go to your browser and access your server’s domain name or IP address on port 8000:

    http://server_domain_or_IP:8000
