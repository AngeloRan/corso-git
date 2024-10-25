from django.urls import path, include
from apiCRUD.api.views import goal_list_create_api_view, goal_retrive_update_delete_api_view, autore_list_api_view
# from rest_framework.routers import DefaultRouter


# router = DefaultRouter()

# router.register(r"goals", GoalCRUD)
# router.register(r"autori", AutoreCRUD)


urlpatterns = [
    #     path("", include(router.urls))
    path("goals/", goal_list_create_api_view, name="goal_list"),
    path("goals/<uuid:uuid>/", goal_retrive_update_delete_api_view, name="goal_detail"),
    path("autori/", autore_list_api_view, name="autore_list")
]
