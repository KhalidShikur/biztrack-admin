import React from 'react';
import { usePage, Link } from '@inertiajs/react';

type Movement = {
  id: number;
  user: { name: string };
  stock: { name: string };
  change: number;
  quantity_after: number;
  created_at: string;
};

type Props = {
  totalProducts: number;
  lowStockCount: number;
  inventoryValue: number | string;
  potentialProfit: number | string;
  recentMovements: Movement[];
};

export default function Dashboard() {
  const {
    totalProducts,
    lowStockCount,
    inventoryValue,
    potentialProfit,
    recentMovements,
  } = usePage<Props>().props;

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div>
          <h3>Low Stock</h3>
          <p style={{ color: lowStockCount > 0 ? 'red' : 'green' }}>
            {lowStockCount}
          </p>
        </div>

        <div>
          <h3>Inventory Value</h3>
          <p>{inventoryValue}</p>
        </div>

        <div>
          <h3>Potential Profit</h3>
          <p>{potentialProfit}</p>
        </div>
      </div>

      <h2>Recent Stock Activity</h2>

      <table>
        <thead>
          <tr>
            <th>Staff</th>
            <th>Product</th>
            <th>Change</th>
            <th>After</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentMovements.map((m) => (
            <tr key={m.id}>
              <td>{m.user.name}</td>
              <td>{m.stock.name}</td>
              <td>{m.change > 0 ? `+${m.change}` : m.change}</td>
              <td>{m.quantity_after}</td>
              <td>{new Date(m.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <Link href="/stocks">Go to Stock</Link>
    </div>
  );
}
