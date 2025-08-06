import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MainLayout } from '@/components/main-layout';
import { PageHeader } from '@/components/page-header';
import { Icons } from '@/components/icons';
import { uksVisits } from '@/lib/mock-data';
import { DashboardCharts } from '@/components/dashboard-charts';

export default function Dashboard() {
  const today = new Date();
  const recentVisits = uksVisits
    .filter(
      (visit) =>
        new Date(visit.entryTime).toDateString() === today.toDateString()
    )
    .slice(0, 5);

  const studentsInUKS = uksVisits.filter(
    (visit) => !visit.exitTime
  ).length;
    
  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's a summary of today's health activities."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students in UKS</CardTitle>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsInUKS}</div>
            <p className="text-xs text-muted-foreground">
              Currently in the health unit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
            <Icons.clipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentVisits.length}</div>
            <p className="text-xs text-muted-foreground">
              Total visits recorded today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Common Issue</CardTitle>
            <Icons.activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Headache</div>
            <p className="text-xs text-muted-foreground">
              Most frequent symptom this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
            <Icons.alertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Paracetamol</div>
            <p className="text-xs text-muted-foreground">
              Needs restocking soon
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>UKS Visit Trends</CardTitle>
            <CardDescription>Visits over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardCharts />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent UKS Entries</CardTitle>
            <CardDescription>Students who visited the UKS today.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Time In</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVisits.length > 0 ? (
                  recentVisits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell>
                        <div className="font-medium">{visit.studentName}</div>
                        <div className="text-sm text-muted-foreground">
                          {visit.studentClass}
                        </div>
                      </TableCell>
                      <TableCell>
                         <Badge variant="outline">{visit.reason}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(visit.entryTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No visits recorded today.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
