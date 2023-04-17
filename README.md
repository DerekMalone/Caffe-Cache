# Caffe-Cache 
Cafe Cache is an application designed to help coffee enthusiasts keep track of their coffee machines, beans, and brewing methods. The application provides a user-friendly interface for storing and organizing information about these three essential elements of a great cup of coffee. The user has full CRUD capabilities on all three major data sets using React.js for the client-side and ASP.NET with SQL database for the server-side.

## Get Started
```
git clone https://github.com/DerekMalone/Caffe-Cache.git
cd Caffe-Cache
```
To run the code, paste the above git commands into your terminal. You will need to open an instance of Visual Studio. Select the "Open a project of solution" option. Navigate to the folder that the above git command cloned to. open the Caffe-Cache.sln file. You will need to go to the DBInit.sql file located in the SQL folder. Execute the DBInit.sql file "Ctl+Shift+E". Then "Start" the C# file by selecting the Start command or "F5".
Once the Server-Side has been successfully started, in your terminal cd into the caffe-cache-client directory. If installed, use the `code .` command to open Visual Studio Code. You will then need to run `npm start` to launch the web application.

## About the User 
- The ideal user for this application is a coffee aficionado who wants to keep track of their at home brewing methods and beans in detail.
- They have have one or more of the following: machine/machines to brew coffee, coffee drink/drinks they enjoy consuming, and have coffee bean/coffee beans they enjoy using to make their drinks.
- The problem this app solves for them is it allows them to keep their multiple different components in order so that they can explore and maximize their coffee brewing process.

## Features 
- When a new Coffee Machine is added, it will be added to the database. That machine and all other machines added by the user will be displayed on the Machines page.
- When a new Coffee is added, it will be added to the database. That coffee and all other coffees added by the user will be displayed on the Coffees page.
- When a new Brew is added, it will be added to the database. That brew and all other brews added by the user will be displayed on the Brews page.
- During the process of adding a new Brew, the user will be able to select a specific machine and coffee that would be suggested to add to that specific brew.
- When viewing any of the following: Machines, Brews, or Coffees, a user will be able to update a specific item.
- When viewing any of the following: Machines, Brews, or Coffees, a user will be able to delete a specific item.

## Relevant Links 
- [Wireframes](https://www.figma.com/file/EWQtszM3C1Ch6JG4Gz08Mn/Caffe-Cache?node-id=0-1&t=dOXclCJoVkRiroIe-0)
- [Project Board](https://dbdiagram.io/d/6324c0db0911f91ba5ccd9f8)

## Code Snippet
### Server-Side: 
``` 
public IActionResult UpdateBrew(int id, [FromBody] Brew brewObj)
            {
                try
                {
                _brewRepository.UpdateBrew(id, brewObj);

                    return Ok();
                }
                catch (Exception ex)
                {
                    return NotFound();
                }
            }
```

### Client-Side:
```
const addBrew = (brewObj) => new Promise ((resolve, reject) => {
    axios.post(`${dbUrl}/Brew`, brewObj)
    .then((response) => {
        if (response.status > 300 || response.status < 200) {
            throw new Error(response.status);
        } else {
            resolve();
        }
    })
    .catch(reject);
})
```

## Contributors
- [Derek Malone](https://github.com/DerekMalone)
