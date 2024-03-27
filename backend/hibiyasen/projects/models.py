from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings


# Projects for estimation
class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, verbose_name=_("Project Name"))
    start_date = models.DateField(verbose_name=_("Start Date"))
    created = models.DateTimeField(auto_now_add=True, verbose_name=_("Created Time"))
    updated = models.DateTimeField(auto_now=True, verbose_name=_("Last Updated Time"))
    
    
class ProjectMember(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="members"
    )
    member = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="projects"
    )


# Tasks in each project
class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, verbose_name=_("Task Name"))
    est_size = models.IntegerField(default=-1, verbose_name=_("Estimated Size"))
    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, verbose_name=_("Project")
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name=_("Created Time"))
    updated = models.DateTimeField(auto_now=True, verbose_name=_("Last Updated Time"))
