from django.shortcuts import render
from apiCRUD.models import Goal, Autore
from apiCRUD.api.serializers import GoalSerializer, AutoreSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from apiCRUD.api.filters import GoalFilter
# class GoalCRUD(ModelViewSet):
#     queryset = Goal.objects.all()
#     serializer_class = GoalSerializer
#     lookup_field = 'uuid'


# class AutoreCRUD(ModelViewSet):
#     queryset = Autore.objects.all()
#     serializer_class = AutoreSerializer
#     lookup_field = 'uuid'


@api_view(["GET", "POST"])
def goal_list_create_api_view(request):
    import sys
    if request.method == "GET":
        goals = Goal.objects.all()
        filterset = GoalFilter(request.GET, queryset=goals)
        if filterset.is_valid():
            goals = filterset.qs  # Applica il filtro se valido

        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            # print("SERIALIZER", serializer.data)
            # # sys.exit()
            serializer.save()
            # print("DATA---------------->", serializer.data)
            # insert_data = dict(serializer.data)

            # # print("HJGGHJJGHIKJHIK----------->", serializer.data)
            # # # sys.exit()
            # autore = Autore.objects.get(uuid=serializer.data["autore"])
            # insert_data["autore"] = autore
            # print("INSERT----------->", insert_data)
            # # print("AUTORE ------->", type(autore))
            # # serializer.autore = autore
            # # serializer.data["autore"] = autore
            # # print("TIPO----------------------___>",
            # #       serializer.data["autore"])
            # new_goal = Goal(**insert_data)
            # new_goal.save()
            # # serializer.save()
            # goal_serializer = GoalSerializer(new_goal)
            # return Response(goal_serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def goal_retrive_update_delete_api_view(request, uuid):

    try:
        goal = Goal.objects.get(uuid=uuid)
    except Goal.DoesNotExist:
        return Response({"Error": {
            "code": 404,
            "message": "Articolo non trovato"
        }})

    if request.method == "GET":
        serializer = GoalSerializer(goal)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = GoalSerializer(goal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        goal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def autore_list_api_view(request):

    autori = Autore.objects.all()
    serializer = AutoreSerializer(autori, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
