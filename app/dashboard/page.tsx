'use client'

import React from 'react'
import { Activity, Brain, Heart, Moon, TrendingUp, Zap, Calendar, Target, AlertCircle, ChevronRight } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold">Wellivian Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Last sync: 5 min ago</span>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                Sync Devices
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Score */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Performance Score</h2>
                <p className="text-gray-400">Your body is operating at peak efficiency today</p>
              </div>
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                92
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Heart}
            title="HRV"
            value="68ms"
            change="+12%"
            status="optimal"
            subtitle="Well recovered"
          />
          <MetricCard
            icon={Moon}
            title="Sleep Quality"
            value="87%"
            change="+5%"
            status="good"
            subtitle="7h 23m total"
          />
          <MetricCard
            icon={Activity}
            title="Training Load"
            value="Moderate"
            change="Balanced"
            status="neutral"
            subtitle="Ready for intensity"
          />
          <MetricCard
            icon={Zap}
            title="Recovery"
            value="94%"
            change="+8%"
            status="optimal"
            subtitle="Fully recovered"
          />
        </div>

        {/* AI Insights */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI Coach Insights
          </h3>
          <div className="space-y-4">
            <InsightCard
              type="positive"
              message="Your HRV trend is excellent. Your 4x4 VO2 max sessions are paying off, even though they suck."
            />
            <InsightCard
              type="neutral"
              message="LDL is still elevated at 142, but context matters: your HDL/Trig ratio is protective. You're likely a lean mass hyper-responder."
            />
            <InsightCard
              type="warning"
              message="Sleep consistency dropped 15% this week. Yeah, we know, life happens. Try to hit the same bedtime tonight."
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickAction
  icon={Target}
  title="Log Workout"
  description="Track your lifts and supersets"
  href="/strength-tracker"  // Changed from /dashboard/workout
/>
          <QuickAction
            icon={Calendar}
            title="View Trends"
            description="30-day progress analysis"
            href="/dashboard/trends"
          />
          <QuickAction
            icon={AlertCircle}
            title="Health Report"
            description="Weekly summary & recommendations"
            href="/dashboard/report"
          />
        </div>
      </div>
    </div>
  )
}

// Metric Card Component
interface MetricCardProps {
  icon: any
  title: string
  value: string
  change: string
  status: 'optimal' | 'good' | 'neutral' | 'warning'
  subtitle: string
}

function MetricCard({ icon: Icon, title, value, change, status, subtitle }: MetricCardProps) {
  const statusColors = {
    optimal: 'text-green-400 bg-green-400/10 border-green-400/20',
    good: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    neutral: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
    warning: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
  }

  return (
    <div className={`rounded-xl p-6 border ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{change}</span>
      </div>
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  )
}

// Insight Card Component
interface InsightCardProps {
  type: 'positive' | 'neutral' | 'warning'
  message: string
}

function InsightCard({ type, message }: InsightCardProps) {
  const typeStyles = {
    positive: 'bg-green-900/20 border-green-800 text-green-300',
    neutral: 'bg-blue-900/20 border-blue-800 text-blue-300',
    warning: 'bg-yellow-900/20 border-yellow-800 text-yellow-300'
  }

  return (
    <div className={`rounded-lg p-4 border ${typeStyles[type]}`}>
      <p className="text-sm">{message}</p>
    </div>
  )
}

// Quick Action Component
interface QuickActionProps {
  icon: any
  title: string
  description: string
  href: string
}

function QuickAction({ icon: Icon, title, description, href }: QuickActionProps) {
    return (
      <a href={href} className="group bg-gray-800/50 hover:bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-6 h-6 text-blue-400" />
          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </a>
    )
  }