import { type ChangeEvent, type FormEvent } from 'react';
import { usePage, useForm } from '@inertiajs/react';

type FormValue = string | number | boolean | Blob | File | null;

interface Stock {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  buy_price: string;
  sell_price: string;
}

interface PageProps {
  stock: Stock;
  [key: string]: unknown;
}

interface StockForm {
  name: string;
  sku: string;
  quantity: number;
  buy_price: string;
  sell_price: string;
  [key: string]: FormValue;
}

export default function Edit() {
  const { stock } = usePage<PageProps>().props;

  const { data, setData, put } = useForm<StockForm>({
    name: stock.name,
    sku: stock.sku,
    quantity: Number(stock.quantity),
    buy_price: stock.buy_price,
    sell_price: stock.sell_price
  });

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
    put(`/stocks/${stock.id}`);
  };

  return (
    <form onSubmit={submit}>
      <input name="name" value={data.name as string} onChange={handleChange} />
      <input name="sku" value={data.sku as string} onChange={handleChange} />
      <input name="quantity" type="number" min={0} value={data.quantity as number} onChange={handleChange} />
      <input name="buy_price" value={data.buy_price as string} onChange={handleChange} />
      <input name="sell_price" value={data.sell_price as string} onChange={handleChange} />
      <button>Update</button>
    </form>
  );
}