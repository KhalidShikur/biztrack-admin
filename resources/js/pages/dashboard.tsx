import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link, router } from '@inertiajs/react';
import React from 'react';

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    LabelList,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type MovementPoint = { date: string; change: number };
type TopProduct = { id: number; name: string; quantity: number };

type Props = {
    totalProducts?: number;
    lowStockCount?: number;
    inventoryValue?: number | string;
    potentialProfit?: number | string;
    recentMovements?: any[];
    movementsPerDay?: MovementPoint[];
    topProducts?: TopProduct[];
    stockDistribution?: { low: number; ok: number };

    // additional stats
    movementsByUser?: { user: string; count: number; total_change: number }[];
    topMovers?: { id: number | null; name: string; total_change: number }[];
    topValueProducts?: { id: number; name: string; value: number }[];
    avgDailyMovements?: number;
    stockAgeBuckets?: { '0_7': number; '8_30': number; '31_90': number; '90_plus': number };
    lowStockPercentage?: number;
};

export default function Dashboard() {
    const {
        totalProducts = 0,
        lowStockCount = 0,
        inventoryValue = 0,
        potentialProfit = 0,
        recentMovements = [],
        movementsPerDay = [],
        topProducts = [],
        stockDistribution = { low: 0, ok: 0 },
        movementsByUser = [],
        topMovers = [],
        topValueProducts = [],
        avgDailyMovements = 0,
        stockAgeBuckets = { '0_7': 0, '8_30': 0, '31_90': 0, '90_plus': 0 },
        lowStockPercentage = 0,
    } = usePage<Props>().props;

    const colors = ['#4F46E5', '#06B6D4', '#F97316', '#10B981', '#EF4444'];

    const formatCurrency = (v: number | string) => {
        if (typeof v === 'number') {
            return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
        }
        return v;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* KPI row */}
                <div className="grid gap-4 md:grid-cols-6">
                    <div className="rounded-xl border p-4">
                        <h4 className="text-sm text-neutral-400">Total Products</h4>
                        <p className="text-2xl font-semibold">{totalProducts}</p>
                    </div>
                    <div className="rounded-xl border p-4">
                        <h4 className="text-sm text-neutral-400">Low Stock</h4>
                        <p className="text-2xl font-semibold">{lowStockCount}</p>
                    </div>
                    <div className="rounded-xl border p-4 hover:shadow-sm">
                        <h4 className="text-sm text-neutral-400">Inventory Value</h4>
                        <p className="text-2xl font-semibold">{formatCurrency(inventoryValue)}</p>
                    </div>
                    <div className="rounded-xl border p-4 hover:shadow-sm">
                        <h4 className="text-sm text-neutral-400">Potential Profit</h4>
                        <p className="text-2xl font-semibold">{formatCurrency(potentialProfit)}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h4 className="text-sm text-neutral-400">Avg Movements / day</h4>
                        <p className="text-2xl font-semibold">{avgDailyMovements}</p>
                    </div>

                    <div className="rounded-xl border p-4 hover:shadow-sm">
                        <h4 className="text-sm text-neutral-400">Low Stock %</h4>
                        <div className="flex items-center gap-3">
                            <p className="text-2xl font-semibold">{lowStockPercentage}%</p>
                            <div className="flex-1">
                                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-[#111] overflow-hidden">
                                    <div className="h-2 bg-red-500" style={{ width: `${Math.max(0, Math.min(100, lowStockPercentage))}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick links to Stocks & Users pages */}
                <div className="mt-2">
                    <div className="rounded-xl border p-4">
                        <h4 className="text-sm text-neutral-400">Quick Links</h4>
                        <div className="mt-3 flex flex-wrap gap-3">
                            <Link href="/stocks" className="inline-block rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200 dark:bg-[#0b0b0b] dark:hover:bg-[#111111]">Stocks</Link>
                            <Link href="/stocks/create" className="inline-block rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200 dark:bg-[#0b0b0b] dark:hover:bg-[#111111]">Add Product</Link>
                            <Link href="/users" className="inline-block rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200 dark:bg-[#0b0b0b] dark:hover:bg-[#111111]">Users</Link>
                            <Link href="/users/create" className="inline-block rounded-md bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200 dark:bg-[#0b0b0b] dark:hover:bg-[#111111]">Add User</Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Area chart: Movements per day (with gradient + tooltip) */}
                    <div className="rounded-xl border p-4 h-72 bg-white dark:bg-[#0a0a0a]">
                        <h4 className="mb-2 text-sm text-neutral-400">Movements (last 30 days)</h4>

                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={movementsPerDay} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gradChange" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.25} />
                                        <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
                                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                <YAxis />
                                <Tooltip content={({ active, payload, label }: any) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded border bg-white p-2 text-sm dark:bg-[#0a0a0a]">
                                                <div className="font-medium">{label}</div>
                                                <div>{payload[0].value > 0 ? `+${payload[0].value}` : payload[0].value} movements</div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Area type="monotone" dataKey="change" stroke="#4F46E5" fill="url(#gradChange)" dot={{ r: 2 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar chart: Top products (labeled) */}
                    <div className="rounded-xl border p-4 h-72 bg-white dark:bg-[#0a0a0a]">
                        <h4 className="mb-2 text-sm text-neutral-400">Top Products (by quantity)</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={topProducts} layout="vertical" margin={{ left: 8 }}>
                                <XAxis type="number" tick={{ fontSize: 11 }} />
                                <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(value: any) => [value, 'Quantity']} />
                                <Bar dataKey="quantity" fill="#06B6D4">
                                    <LabelList dataKey="quantity" position="right" style={{ fontSize: 12 }} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie charts: Stock distribution + Top products share */}
                    <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
                        <h4 className="mb-2 text-sm text-neutral-400">Stock Distribution</h4>

                        <div className="flex flex-col items-center gap-3">
                            <ResponsiveContainer width="100%" height={160}>
                                <PieChart>
                                    <Pie
                                        data={[{ name: 'Low', value: stockDistribution.low }, { name: 'OK', value: stockDistribution.ok }]}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={36}
                                        outerRadius={68}
                                        paddingAngle={3}
                                    >
                                        <Cell key="cell-low" fill="#EF4444" />
                                        <Cell key="cell-ok" fill="#10B981" />
                                    </Pie>
                                    {/* Tooltip will show the name (Low / OK) on hover */}
                                    <Tooltip formatter={(value: any, name: any) => [`${value}`, `${name}`]} />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* small top products pie */}
                            <div className="w-full">
                                <h5 className="text-sm text-neutral-400 mb-2">Top Products (share)</h5>
                                <ResponsiveContainer width="100%" height={120}>
                                    <PieChart>
                                        <Pie
                                            data={topProducts.map((p) => ({ name: p.name, value: p.quantity }))}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={20}
                                            outerRadius={50}
                                            paddingAngle={2}
                                        >
                                            {topProducts.map((_, i) => (
                                                <Cell key={`tp-${i}`} fill={colors[i % colors.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: any, name: any) => [`${value}`, `${name}`]} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Cumulative movements area */}
                    <div className="rounded-xl border p-4 md:col-span-3 bg-white dark:bg-[#0a0a0a]">
                        <h4 className="mb-2 text-sm text-neutral-400">Cumulative Movements (last 30 days)</h4>
                        <ResponsiveContainer width="100%" height={150}>
                            <AreaChart
                                data={(() => {
                                    let acc = 0;
                                    return movementsPerDay.map((d) => {
                                        acc += d.change;
                                        return { date: d.date, total: acc };
                                    });
                                })()}
                            >
                                <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
                                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                <YAxis />
                                <Tooltip formatter={(value: any) => [value, 'Cumulative']} />
                                <Area type="monotone" dataKey="total" stroke="#F97316" fillOpacity={0.15} fill="#F97316" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                    {/* Additional charts: movements by user, top movers, top value products */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
                            <h4 className="mb-2 text-sm text-neutral-400">Movements by User (last 30 days)</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={movementsByUser} margin={{ left: 0 }}>
                                    <XAxis dataKey="user" tick={{ fontSize: 11 }} />
                                    <YAxis />
                                    <Tooltip formatter={(value: any) => [value, 'Count']} />
                                    <Bar dataKey="count" fill="#4F46E5">
                                        <LabelList dataKey="count" position="top" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
                            <h4 className="mb-2 text-sm text-neutral-400">Top Movers (last 30 days)</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={topMovers} layout="vertical" margin={{ left: 8 }}>
                                    <XAxis type="number" tick={{ fontSize: 11 }} />
                                    <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(value: any) => [value, 'Qty']} />
                                    <Bar dataKey="total_change" fill="#F97316" cursor="pointer" onClick={(d: any) => { if (d && d.id) router.visit(`/stocks/${d.id}/edit`); }}>
                                        <LabelList dataKey="total_change" position="right" style={{ fontSize: 12 }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
                            <h4 className="mb-2 text-sm text-neutral-400">Top Products by Value</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={topValueProducts} layout="vertical" margin={{ left: 8 }}>
                                    <XAxis type="number" tick={{ fontSize: 11 }} />
                                    <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(value: any) => [Number(value).toFixed(2), 'Value']} />
                                    <Bar dataKey="value" fill="#06B6D4" cursor="pointer" onClick={(d: any) => { if (d && d.id) router.visit(`/stocks/${d.id}/edit`); }}>
                                        <LabelList dataKey="value" position="right" style={{ fontSize: 12 }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Stock age distribution */}
                    <div className="rounded-xl border p-4 my-2 bg-white dark:bg-[#0a0a0a]">
                        <h4 className="mb-2 text-sm text-neutral-400">Stock Age Distribution</h4>
                        <ResponsiveContainer width="100%" height={120}>
                            <BarChart
                                data={[
                                    { name: '0-7 days', v: stockAgeBuckets['0_7'] },
                                    { name: '8-30 days', v: stockAgeBuckets['8_30'] },
                                    { name: '31-90 days', v: stockAgeBuckets['31_90'] },
                                    { name: '>90 days', v: stockAgeBuckets['90_plus'] },
                                ]}
                            >
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip formatter={(value: any) => [value, 'Count']} />
                                <Bar dataKey="v" fill="#10B981">
                                    <LabelList dataKey="v" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                {/* Recent activities / big area */}
                <div className="rounded-xl border p-4">
                    <h4 className="mb-3 text-sm text-neutral-400">Recent Stock Activity</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed text-sm">
                            <thead>
                                <tr className="text-left text-neutral-500">
                                    <th>Staff</th>
                                    <th>Product</th>
                                    <th>Change</th>
                                    <th>After</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentMovements.map((m: any) => (
                                    <tr key={m.id} className="border-t">
                                        <td className="py-2">{m.user?.name}</td>
                                        <td>{m.stock?.name}</td>
                                        <td>{m.change > 0 ? `+${m.change}` : m.change}</td>
                                        <td>{m.quantity_after}</td>
                                        <td>{new Date(m.created_at).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
