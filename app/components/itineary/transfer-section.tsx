"use client"

import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card"
import { Input } from "../../ui/input"

import { Label } from "../../ui/lable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Car, Plus, Trash2 } from "lucide-react"
import type { Transfer } from "../../types/itinery"

interface TransfersSectionProps {
  transfers: Transfer[]
  onAddTransfer: () => void
  onUpdateTransfer: (transferId: string, field: keyof Transfer, value: string | number) => void
  onRemoveTransfer: (transferId: string) => void
}

export function TransfersSection({
  transfers,
  onAddTransfer,
  onUpdateTransfer,
  onRemoveTransfer,
}: TransfersSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Transfers
          </CardTitle>
          <CardDescription>Add transportation for this day</CardDescription>
        </div>
        <Button onClick={onAddTransfer} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Transfer
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {transfers.map((transfer, transIndex) => (
          <div key={transfer.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Transfer {transIndex + 1}</h4>
              <Button variant="ghost" size="sm" onClick={() => onRemoveTransfer(transfer.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
              <div className="space-y-2">
                <Label>Transfer Type</Label>
                <Select value={transfer.type} onValueChange={(value:any) => onUpdateTransfer(transfer.id, "type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type " className="" />
                  </SelectTrigger>
                  <SelectContent className="bg-purple-100 border-b">
                    <SelectItem value="taxi">Taxi</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="train">Train</SelectItem>
                    <SelectItem value="private-car">Private Car</SelectItem>
                    <SelectItem value="metro">Metro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={transfer.time}
                  onChange={(e:any) => onUpdateTransfer(transfer.id, "time", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>From</Label>
                <Input
                  placeholder="Hotel"
                  value={transfer.from}
                  onChange={(e:any) => onUpdateTransfer(transfer.id, "from", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input
                  placeholder="Airport"
                  value={transfer.to}
                  onChange={(e:any) => onUpdateTransfer(transfer.id, "to", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  placeholder="30 minutes"
                  value={transfer.duration}
                  onChange={(e:any) => onUpdateTransfer(transfer.id, "duration", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  min="0"
                  value={transfer.price}
                  onChange={(e:any) => onUpdateTransfer(transfer.id, "price", Number.parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Max People</Label>
                <Input
                  type="number"
                  min="1"
                  value={transfer.maxPeople}
                  onChange={(e:any) => onUpdateTransfer(transfer.id, "maxPeople", Number.parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
