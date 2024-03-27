from hibiyasen.views import CustomGenericViewSet
from .models import Project, Task, ProjectMember
from .serializers import ProjectSerializer, TaskSerializer, ProjectMemberSerializer
from authentication.permissions import IsMemberOrReadOnly


class ProjectViewSet(CustomGenericViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    # permission_classes = [IsMemberOrReadOnly]
    
    
class ProjectMemberViewSet(CustomGenericViewSet):
    serializer_class = ProjectMemberSerializer
    queryset = ProjectMember.objects.all()
    
    
class TaskList(CustomGenericViewSet):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        return Task.objects.filter(project_id=self.kwargs['project_pk'])
    
    def get_serializer_context(self):
        return {"project_id": self.kwargs["project_pk"]}