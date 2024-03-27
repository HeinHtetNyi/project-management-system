from django.urls import path, include
from rest_framework_nested import routers
from . import views

projects_router = routers.SimpleRouter()
projects_router.register('projects', views.ProjectViewSet)
tasks_router = routers.NestedSimpleRouter(projects_router, 'projects', lookup='project')
tasks_router.register('tasks', views.TaskList, basename='project-tasks')
projects_router.register('projects-members', views.ProjectMemberViewSet)


urlpatterns = projects_router.urls + tasks_router.urls
