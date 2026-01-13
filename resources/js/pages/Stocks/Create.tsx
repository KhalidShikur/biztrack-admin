import { type ChangeEvent, type FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

type FormValue = string | number | boolean | Blob | File | null;

interface StockForm {
  name: string;
  sku: string;
  quantity: number;
  buy_price: string;
  sell_price: string;
  [key: string]: FormValue;
}

const initialData: StockForm = {
  name: '',
  sku: '',
  quantity: 0,
  buy_price: '',
  sell_price: ''
};

export default function Create() {
  const { data, setData, post } = useForm<StockForm>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      const num = Number(value);
      setData(name, Number.isNaN(num) ? 0 : Math.max(0, num));
    } else {
      setData(name, value);
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/stocks');
  };

  return (
    <div className="rounded-xl border p-4 bg-white dark:bg-[#0a0a0a]">
      <h1 className="mb-1 font-medium">Add Product</h1>
      <form onSubmit={submit} className="grid gap-3 max-w-md">
        <label className="block">
          <span className="text-sm text-neutral-400">Name</span>
          <input name="name" placeholder="Name" value={data.name as string} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a]" />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-400">SKU</span>
          <input name="sku" placeholder="SKU" value={data.sku as string} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a]" />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-400">Quantity</span>
          <input name="quantity" type="number" min={0} placeholder="Qty" value={data.quantity as number} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a]" />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-400">Buy Price</span>
          <input name="buy_price" placeholder="Buy Price" value={data.buy_price as string} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a]" />
        </label>

        <label className="block">
          <span className="text-sm text-neutral-400">Sell Price</span>
          <input name="sell_price" placeholder="Sell Price" value={data.sell_price as string} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm bg-white dark:bg-[#0a0a0a]" />
        </label>

        <div>
          <button className="inline-block rounded-sm border border-black bg-[#1b1b18] px-4 py-1.5 text-sm text-white">Add</button>
        </div>
      </form>
    </div>
  );
}