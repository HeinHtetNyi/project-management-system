from rest_framework import serializers
from .models import Project, Task, ProjectMember

class ProjectMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMember
        fields = "__all__"
        

class ProjectSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    class Meta:
        model = Project
        fields = ["project_id", "name", "start_date", "members", "created", "updated"]

    def get_members(self, obj):
        return [member['member'] for member in obj.members.values('member')]
        
        
class TaskSerializer(serializers.ModelSerializer):
    # project = serializers.HyperlinkedIdentityField()
    class Meta:
        model = Task
        fields = ['task_id', 'name', 'est_size', 'created', 'updated']
        
    def create(self, validated_data):
        return Task.objects.create(project_id=self.context['project_id'], **validated_data)
        