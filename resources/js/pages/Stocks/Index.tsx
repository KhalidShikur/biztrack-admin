import { usePage, Link, router } from '@inertiajs/react';

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
  stocks: Stock[];
  lowStockCount: number;
  [key: string]: unknown;
}

export default function Index() {
  const { stocks, lowStockCount } = usePage<PageProps>().props;

  const remove = (id: number) => {
    if (window.confirm('Delete this product?')) {
      router.delete(`/stocks/${id}`);
    }
  };

  return (
    <div>
      <h1>Stock</h1>
      <Link href="/stocks/create">Add Product</Link>

      <h2 style={{ color: lowStockCount > 0 ? 'red' : 'green' }}>
        Low Stock Items: {lowStockCount}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Qty</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.sku}</td>
              <td style={{ color: s.is_low ? 'red' : 'green' }}>
                {s.quantity}
                {s.is_low && ' ⚠️'}
              </td>
              <td>{s.profit_per_item}</td>
              <td>{s.buy_price}</td>
              <td>{s.sell_price}</td>
              <td>
                {' | '}
                <Link href={`/stocks/${s.id}/edit`}>Edit</Link>
                {' | '}
                <Link href={`/stocks/${s.id}/history`}>History</Link>
                {' | '}
                <button onClick={() => remove(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}