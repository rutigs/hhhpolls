from django.contrib import admin
from polls.models import Choice, Poll, Voter

# Register your models here.


class ChoiceInline(admin.StackedInline):
    model = Choice
    fields = ('name', 'url', 'votes')
    # readonly_fields = ('votes',)


class PollAdmin(admin.ModelAdmin):
    fields = ('name', 'open', 'embed_url')
    inlines = [ChoiceInline]


admin.site.register(Poll, PollAdmin)