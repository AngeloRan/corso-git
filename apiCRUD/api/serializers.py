from rest_framework import serializers
from apiCRUD.models import Goal, Autore


class GoalSerializer(serializers.ModelSerializer):

    # autore = serializers.UUIDField(write_only=True, source="autore")
    # autore = serializers.SlugRelatedField(
    #     queryset=Autore.objects.all(), slug_field="uuid", write_only=True)

    class Meta:
        model = Goal
        fields = "__all__"
        depth = 1

    # def validate(self, attrs):
    #     print("ATT", attrs)
    #     # attrs["autore"] = attrs["autore"]["uuid"]
    #     return super().validate(attrs)

    # def update(self, instance, validated_data):
    #     for key, value in validated_data.items():
    #         if key == "autore":
    #             instance.autore = Autore.objects.get(uuid=value)
    #         elif value is None or value == "" or value == " ":
    #             continue
    #         else:
    #             setattr(instance, key, value)
    #     instance.save()
    #     return instance

    def create(self, validated_data):
        print("VALIDATED----------------------------", validated_data)
        autore = Autore.objects.get(uuid=validated_data["autore"])
        validated_data["autore"] = autore
        return super().create(validated_data)


class AutoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Autore
        # exclude = ["id"]
        fields = "__all__"
