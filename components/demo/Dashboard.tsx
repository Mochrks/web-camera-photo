"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardComponent() {
    return (
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {['Total Filter', 'Total Frame', 'Total Users', 'Total Promo'].map((title, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
