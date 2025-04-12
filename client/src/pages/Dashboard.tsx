import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { fetchLeaderboard, fetchPerformanceStats } from "@/lib/api";
import { Link } from "wouter";
import { Clock, Medal, Award, TrendingUp, Users } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch performance stats
  const { 
    data: performanceStats,
    isLoading: statsLoading,
    error: statsError
  } = useQuery({
    queryKey: ['/dashboard/performance'],
    queryFn: fetchPerformanceStats
  });

  // Fetch leaderboard data
  const {
    data: leaderboard,
    isLoading: leaderboardLoading,
    error: leaderboardError
  } = useQuery({
    queryKey: ['/dashboard/leaderboard'],
    queryFn: fetchLeaderboard
  });

  // Handle errors
  if (statsError || leaderboardError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load dashboard data. Please try again."
    });
  }

  // Format data for charts
  const difficultyChartData = performanceStats?.scoreByDifficulty ? 
    Object.entries(performanceStats.scoreByDifficulty).map(([difficulty, score]) => ({
      difficulty,
      score
    })) : [];

  const categoryChartData = performanceStats?.examCountByCategory ?
    Object.entries(performanceStats.examCountByCategory).map(([category, count]) => ({
      category,
      count
    })) : [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1'];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-600">View your exam performance analytics and leaderboard rankings</p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Key stats cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Exams Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <div className="text-3xl font-bold">{performanceStats?.totalExamsTaken || 0}</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    Average Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <div className="text-3xl font-bold">{performanceStats?.averageScore || 0}%</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Medal className="h-5 w-5 text-yellow-500" />
                    Highest Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <div className="text-3xl font-bold">{performanceStats?.highestScore || 0}%</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Pass Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <div className="text-3xl font-bold">
                      {performanceStats ? 
                        Math.round((performanceStats.totalPassed / (performanceStats.totalPassed + performanceStats.totalFailed)) * 100) || 0 
                        : 0}%
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest exam results</CardDescription>
                </CardHeader>
                <CardContent>
                  {leaderboardLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      ))}
                    </div>
                  ) : leaderboard && Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                    <div className="space-y-3">
                      {leaderboard.slice(0, 5).map((entry, idx) => (
                        <div key={`${entry.userId}-${entry.examId}-${idx}`} className="flex justify-between items-center p-3 border rounded-lg">
                          <div className="flex flex-col">
                            <span className="font-medium">{entry.examTitle}</span>
                            <span className="text-sm text-slate-500">{new Date(entry.date).toLocaleDateString()}</span>
                          </div>
                          <Badge variant={entry.score >= 70 ? "default" : "outline"}>
                            {entry.score}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-slate-500">
                      <p>No exam activity yet</p>
                      <Button asChild className="mt-4">
                        <Link href="/">Take an Exam</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Performance by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Category</CardTitle>
                  <CardDescription>Your performance across different exam categories</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {statsLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Skeleton className="h-64 w-full" />
                    </div>
                  ) : categoryChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="category"
                          label={({ category, count }) => `${category}: ${count}`}
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center text-slate-500">
                      <p>Not enough data to display category performance</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Difficulty</CardTitle>
                  <CardDescription>Your average scores across different difficulty levels</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  {statsLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Skeleton className="h-64 w-full" />
                    </div>
                  ) : difficultyChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={difficultyChartData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="difficulty" />
                        <YAxis label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                        <Legend />
                        <Bar dataKey="score" name="Average Score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center text-slate-500">
                      <p>Not enough data to display difficulty performance</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Improvement Over Time</CardTitle>
                  <CardDescription>Your progress over the last 10 exams</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {leaderboardLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Skeleton className="h-64 w-full" />
                    </div>
                  ) : leaderboard && Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[...leaderboard].slice(0, Math.min(10, leaderboard.length))}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="examTitle" tick={false} />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [value, name === 'score' ? 'Score' : name]}
                          labelFormatter={(index) => `Exam: ${index < leaderboard.length ? leaderboard[index].examTitle : 'Unknown'}`}
                        />
                        <Legend />
                        <Bar dataKey="score" name="Score" fill="#4ade80" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center text-slate-500">
                      <p>Take more exams to see your improvement over time</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>Top performers across all exams</CardDescription>
              </CardHeader>
              <CardContent>
                {leaderboardLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="h-5 w-32 mb-1" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-12" />
                      </div>
                    ))}
                  </div>
                ) : leaderboard && Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                  <div className="space-y-2">
                    {leaderboard.map((entry, index) => (
                      <div 
                        key={`${entry.userId}-${entry.examId}-${index}`}
                        className={`flex justify-between items-center p-4 rounded-lg ${
                          index < 3 
                            ? 'bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 shadow-sm' 
                            : 'border border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            index === 0 ? 'bg-yellow-100 text-yellow-600' :
                            index === 1 ? 'bg-slate-100 text-slate-600' :
                            index === 2 ? 'bg-amber-100 text-amber-600' :
                            'bg-slate-50 text-slate-600'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{entry.username}</div>
                            <div className="text-sm text-slate-500">{entry.examTitle}</div>
                          </div>
                        </div>
                        <div className="font-semibold text-lg">
                          {entry.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500">
                    <p>No leaderboard data available</p>
                    <Button asChild className="mt-4">
                      <Link href="/">Take an Exam to Rank</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}