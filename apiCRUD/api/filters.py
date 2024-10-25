from django_filters import rest_framework as filters
from apiCRUD.models import Goal


class GoalFilter(filters.FilterSet):
    name = filters.CharFilter()
    name__icontains = filters.CharFilter(
        field_name="name", lookup_expr="icontains")
    name__noncontains = filters.CharFilter(
        field_name="name", lookup_expr="icontains", exclude=True)
    autore = filters.CharFilter(field_name="autore__nome")
    intensity = filters.NumberFilter()
    intensity__gte = filters.NumberFilter(
        field_name="intensity", lookup_expr="gte")
    intensity__gt = filters.NumberFilter(
        field_name="intensity", lookup_expr="gt")

    class Meta:
        model = Goal
        fields = ["name", "autore", "intensity", "created_at"]
