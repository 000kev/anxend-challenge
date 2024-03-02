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

Here we have a database populated with some data using the app and the app itself. In the database we have 3 entries in London city, so if you pick London as a filter, the
3 schools in that City will be displayed on the right hand side. This use case demonstrates how the filter option works and that it uses the entries from the database
to populate the dropdown. Test it out!

<span> 
  <img width="360" alt="db" src="https://github.com/000kev/anxend-challenge/assets/26770945/c4a73451-8079-4331-88e3-d77cf9961042">
  <img width="360" alt="start" src="https://github.com/000kev/anxend-challenge/assets/26770945/6dfeaaa1-e220-4273-9367-643c138e6bdd">
  <img width="360" alt="filter" src="https://github.com/000kev/anxend-challenge/assets/26770945/67b312f7-36a6-4051-aad7-dc970bdc1fe5">
</span>

Now let's expand on this use case to show the add feature by adding King's School Junior. Not all the fields are required but the app will let you know which ones are. In this
example we have all the required fields and we can go ahead and press Create! Now if you look at the filtered schools, under London, you'll see King's School Junior has been 
added. Nice. Let's check the database and what's this? The objects in the database increased from 28 to 30?! No, this is not a glitch. EdgeDB allows you to create schemas
and in this schema, even though, Schools and Addresses are related/linked, they are their own objects, so with each entry, you are adding a School object and an Address object.

<span>
  <img width="360" alt="db" src="https://github.com/000kev/anxend-challenge/assets/26770945/e0068280-5cdc-43a1-9d9c-198980fb9dd1">
  <img width="360" alt="added" src="https://github.com/000kev/anxend-challenge/assets/26770945/856e6331-45a7-49bd-9bf0-1d580ad2f9f3">
  <img width="360" alt="add" src="https://github.com/000kev/anxend-challenge/assets/26770945/e939db9b-c13d-4d51-a147-e45a2fd748c8">
</span>

I encourage you to try it out on your local machine. There are a few extra progressive enhancement and validation features that you can only appreciate through running the app yourself!

### Considerations on production-ready requirements
### Testing
The complexity of this project made testing relatively easy, but with more complex projects, I would consider using Remix's library <code>@remix-run/testing</code>, jest and React's testing library.
### Accessibility
In keeping with the ideas of accessibility, I used semantic elements when creating the components of the forms.
### Deployment, Security & Validation
There are a number of options for deployment. I would most likely use EdgeDB Cloud and Fly.io myself, but deployment would also be possible with Docker. To ensure security, I would make use
of environment variables saved in private files unavailable to users to connect to the database and store secrets and keys. Performance tweaks can be made depending on the deployment method
but I would add validation to ensure that duplicate schools can't be added to the database.


