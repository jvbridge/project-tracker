# project-tracker
This is a small project tracker app, it was initially made in an hour, however 
it expanded into quite a bit more work.

## Installation

Simply visit https://jvbridge.github.io/project-tracker/
If you wish to host it yourself merely host all the files in the main branch

## Usage

Uses local storage to keep your projects persistant. Every project needs a
name, type, hourly rate of pay, and a due date. Merely enter the information
into the modal that appears after you click "create project" and it will add
a row to the table showing it.
It will also make a button on each row allowing you to delete each project.

If you want to delete all projects put clearProjects() into the console. 

## Important Code Snippet 

A key part of the functionality and styling of the site came from our use of Bootstrap. The code below shows the built-in classes that allowed for this project to look the way it did. The following html code shows the built-in Bootstrap classes that allowed for the creation of the project form-submission. 

```html
<div class="col-lg-3 col-md-12 p-3">
    <div class="card bg-light">
        <div class="card-body ">
            <h5 class="card-title">
                INSTRUCTIONS
            </h5>
            <p class="card-text">By clicking this button you will be prompted to input the following information:</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item list">Project Name</li>
                <li class="list-group-item list">Project Type</li>
                <li class="list-group-item list">Hourly Rate ($)</li>
                <li class="list-group-item list">Due Date</li>
            </ul>
            <div class="text-center">
                <button 
                id="create-form-button"
                class="btn btn-primary p-3 mt-3 w-100" 
                data-bs-toggle="modal" 
                data-bs-target="#create-project-modal">
                    Create Project
                </button>
            </div>
        </div>
    </div>
```

## Credits

Code by Jonathan Bridge and Lucca Martins
https://github.com/jvbridge
https://github.com/luccaloopz
Much of it was pair programming

CSS by bootstrap
https://getbootstrap.com/

times by momentjs
https://momentjs.com/

additional help with jquery
https://jquery.com/

## License
