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
    <form onSubmit={submit}>
      <input name="name" placeholder="Name" value={data.name as string} onChange={handleChange} />
      <input name="sku" placeholder="SKU" value={data.sku as string} onChange={handleChange} />
      <input name="quantity" type="number" min={0} placeholder="Qty" value={data.quantity as number} onChange={handleChange} />
      <input name="buy_price" placeholder="Buy Price" value={data.buy_price as string} onChange={handleChange} />
      <input name="sell_price" placeholder="Sell Price" value={data.sell_price as string} onChange={handleChange} />
      <button>Add</button>
    </form>
  );
}