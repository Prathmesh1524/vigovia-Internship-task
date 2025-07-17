"use client"

import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card"
import { Input } from "../../ui/input"
import { Label } from "../../ui/lable"
import { Textarea } from "../../ui/textarea"
import { Clock, Plus, Trash2 } from "lucide-react"
import type { Activity } from "../../types/itinery"

interface ActivitiesSectionProps {
  activities: Activity[]
  onAddActivity: () => void
  onUpdateActivity: (activityId: string, field: keyof Activity, value: string | number) => void
  onRemoveActivity: (activityId: string) => void
}

export function ActivitiesSection({
  activities,
  onAddActivity,
  onUpdateActivity,
  onRemoveActivity,
}: ActivitiesSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activities
          </CardTitle>
          <CardDescription>Add activities for this day</CardDescription>
        </div>
        <Button onClick={onAddActivity} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, actIndex) => (
          <div key={activity.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Activity {actIndex + 1}</h4>
              <Button variant="ghost" size="sm" onClick={() => onRemoveActivity(activity.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Activity Name</Label>
                <Input
                  placeholder="Eiffel Tower Visit"
                  value={activity.name}
                  onChange={(e) => onUpdateActivity(activity.id, "name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="Champ de Mars, Paris"
                  value={activity.Location}
                  onChange={(e) => onUpdateActivity(activity.id, "Location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={activity.time}
                  onChange={(e) => onUpdateActivity(activity.id, "time", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  placeholder="2 hours"
                  value={activity.duration}
                  onChange={(e) => onUpdateActivity(activity.id, "duration", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={activity.price}
                  onChange={(e) => onUpdateActivity(activity.id, "price", Number.parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Visit the iconic Eiffel Tower and enjoy panoramic views of Paris..."
                value={activity.des}
                onChange={(e) => onUpdateActivity(activity.id, "des", e.target.value)}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
