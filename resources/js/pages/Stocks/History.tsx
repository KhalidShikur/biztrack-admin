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
        <div>
            <h1>Stock History: {stock.name}</h1>
            <Link href="/stocks">← Back</Link>

            <table>
                <thead>
                    <tr>
                        <th>Staff</th>
                        <th>Change</th>
                        <th>After</th>
                        <th>Reason</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map(m => (
                        <tr key={m.id}>
                            <td>{m.user.name}</td>
                            <td>{m.change > 0 ? `+${m.change}` : m.change}</td>
                            <td>{m.quantity_after}</td>
                            <td>{m.reason}</td>
                            <td>{new Date(m.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
