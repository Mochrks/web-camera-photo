"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, LayoutGrid, Users, Tag, TrendingUp, Camera, Share2, Heart } from "lucide-react";

const stats = [
  {
    title: "Total Filters",
    value: "24",
    icon: Sparkles,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    trend: "+12%",
  },
  {
    title: "Active Frames",
    value: "48",
    icon: LayoutGrid,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    trend: "+5%",
  },
  {
    title: "Total Sessions",
    value: "1,284",
    icon: Camera,
    color: "text-amber-600",
    bg: "bg-amber-50",
    trend: "+18%",
  },
  {
    title: "User Shares",
    value: "852",
    icon: Share2,
    color: "text-rose-600",
    bg: "bg-rose-50",
    trend: "+24%",
  },
];

export default function DashboardComponent() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-neutral-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-sm h-80 flex flex-col items-center justify-center text-neutral-400 bg-neutral-50/50 border-2 border-dashed border-neutral-200">
          <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
          <p>Growth Analytics Chart (Placeholder)</p>
        </Card>
        <Card className="border-none shadow-sm h-80 flex flex-col items-center justify-center text-neutral-400 bg-neutral-50/50 border-2 border-dashed border-neutral-200">
          <Heart className="w-12 h-12 mb-4 opacity-20" />
          <p>Popular Filters View (Placeholder)</p>
        </Card>
      </div>
    </div>
  );
}
