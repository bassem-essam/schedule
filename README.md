# Schedule

A simple web app built with React & Material UI.
It is an interactive schedule for courses of the 3rd semester at FCIS, ASU.
It is made to simply show the user all the available time slots for a given course or a collection of courses based on a given filter.

## Structure
Data is arranged in a hierarchical structure in a root directory called 'data'. 
Each folder represents a day in the week, and inside each folder (thus inside each day), there are the text files corresponding to each place or hall in your college.
The text file is split into blocks of four lines each block is called Unit.
Each line of the four describes information for each Unit like (course name, instructor, time slot, department) and they are stacked in contiguous lines. 
Blank lines separates between units.
A helper file named info.txt carries relation between aliases (nicknames) you should give to day names and hall names (to simplify the process of repeating the place name whatever your language is, also to improve readability, structure and localization)
The first line has day aliases to day names, while the following lines describe hall definitions.

## Why
I created this project as there are many common courses among all the departments in my current semester, and each department has different time slots for lectures and sections (classes). When I was absent for a lecture or section for some reason, I would like to know the best suitable time slot available for me.
So it was a tedious task to search for a course in the four departments. 

## How to run
1. clone this repo using <code>git clone https://github.com/bassem-essam/schedule.git</code>.
2. edit files info.txt and every all files inside data directory according to the specific structure above.
3. run <code>python prepare.py</code>
4. run  <code>npm start</code> to start react development server until the data is well reflected.
5. run <code>npm bulid</code> and use the produced site (under build directory) anywhere you like.