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
    <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="mb-1 font-medium">Stock</h1>
        <Link href="/stocks/create" className="inline-block rounded-sm border border-[#19140035] px-4 py-1.5 text-sm leading-normal hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC]">Add Product</Link>
      </div>

      <h2 className={`mb-4 text-sm font-medium ${lowStockCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
        Low Stock Items: {lowStockCount}
      </h2>

      <table className="w-full table-fixed text-sm">
        <thead>
          <tr>
            <th className="text-left text-sm text-neutral-400 pb-2">Name</th>
            <th className="text-left text-sm text-neutral-400 pb-2">SKU</th>
            <th className="text-left text-sm text-neutral-400 pb-2">Qty</th>
            <th className="text-left text-sm text-neutral-400 pb-2">Buy</th>
            <th className="text-left text-sm text-neutral-400 pb-2">Sell</th>
            <th className="text-left text-sm text-neutral-400 pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="py-2">{s.name}</td>
              <td className="py-2">{s.sku}</td>
              <td className={`py-2 ${s.is_low ? 'text-red-600' : 'text-green-600'}`}>
                {s.quantity}
                {s.is_low && ' ⚠️'}
              </td>
              <td className="py-2">{s.profit_per_item}</td>
              <td className="py-2">{s.buy_price}</td>
              <td className="py-2">{s.sell_price}</td>
              <td className="py-2">
                <Link href={`/stocks/${s.id}/edit`} className="text-sm underline mr-2">Edit</Link>
                <Link href={`/stocks/${s.id}/history`} className="text-sm underline mr-2">History</Link>
                <button onClick={() => remove(s.id)} className="text-sm text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}