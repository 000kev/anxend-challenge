## Anxend Project 1 Submission

### Project 1 Usage:

The purpose of this project was to create a page with a form that can add a school and its address to the database and to be able to filter the list of schools based
on a specified home town or city. For this project, I used remix, edgedb and react while following best practices to the best of my knowledge while learning the framework.
Visual sytling for this project was not needed, however I did add some basic visual elements using tailwindcss and tailwind flowbite for better UX and flow.

The project has only been configured to work in local developments (because EdgeDB Cloud's free tier isnt available yet :/ ) which requires to create an edgedb instance
on your local machine and connect it to the project using <code>edgedb project init</code>. Make sure to install depencies <code>npm ci</code> and migrate the database 
<code>edgedb migrate</code>. Once all of the admin is out of the way, you can test out this bad boy on your local machine using this command <code>npm run dev</code>.

One thing to note when using the application: once the application is running, if you go to localhost:xxxx, you will land on a blank purple page. I did try to get
the manual router configurations working but it seems I need more time to get it right. So for *my* convenience, please go to the browser url and type in anything like this:
<code>localhost:xxxx/home</code>. It doesn't have to be home, it can be anything at all! Then you're good to go!

### Examples

Here we have an example of a database populated with some data using the app and the app itself
<br/>
<span> 
  <img width="360" alt="db" src="https://github.com/000kev/anxend-challenge/assets/26770945/c4a73451-8079-4331-88e3-d77cf9961042">
  <img width="360" alt="start" src="https://github.com/000kev/anxend-challenge/assets/26770945/6dfeaaa1-e220-4273-9367-643c138e6bdd">
</span>


