## To Start Backend Server

Run these commands line by line
```
    cd backend
    python -m venv venv
    source venv/bin/activate    // linux
    pip install -r requriements.txt
    cd hibiyasen
    python manage.py migrate
    python manage.py runserver
```


## To Start Frontend

Run these commands line by line
```
    cd frontend
    npm install
    npm run dev
```


## Feature Overview
* You can create, update, modify projects
* You can assign, update, and remove tasks from a project


## Technology Overview
* Frontend: React, MUI
* Backend: Django Rest Framework
* Database: SQLite


## Remark
* not authentication and authorization yet
* have implemented object level permissions, but haven't connected it with frontend yet
* currently, I disable object level permission in project viewset, so that we can CRUD a project from frontend
