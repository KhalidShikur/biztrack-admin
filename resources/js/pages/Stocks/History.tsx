import { usePage, Link } from '@inertiajs/react';

interface Movement {
    id: number;
    user: {
        name: string;
    };
    change: number;
    quantity_after: number;
    reason: string;
    created_at: string;
}

interface Stock {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  is_low: boolean;
  profit_per_item: number;
  buy_price: string;
  sell_price: string;
}

interface PageProps {
    stock: Stock;
    movements: Movement[];
    [key: string]: unknown;
}

export default function History() {
    const { stock, movements } = usePage<PageProps>().props;

    return (
        <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="mb-1 font-medium">Stock History: {stock.name}</h1>
                <Link href="/stocks" className="inline-block rounded-sm border px-3 py-1 text-sm">← Back</Link>
            </div>

            <table className="w-full table-fixed text-sm">
                <thead>
                    <tr>
                        <th className="text-left text-sm text-neutral-400 pb-2">Staff</th>
                        <th className="text-left text-sm text-neutral-400 pb-2">Change</th>
                        <th className="text-left text-sm text-neutral-400 pb-2">After</th>
                        <th className="text-left text-sm text-neutral-400 pb-2">Reason</th>
                        <th className="text-left text-sm text-neutral-400 pb-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map(m => (
                        <tr key={m.id} className="border-t">
                            <td className="py-2">{m.user.name}</td>
                            <td className="py-2">{m.change > 0 ? `+${m.change}` : m.change}</td>
                            <td className="py-2">{m.quantity_after}</td>
                            <td className="py-2">{m.reason}</td>
                            <td className="py-2">{new Date(m.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
