<!DOCTYPE html>
<html>
<head>
    <title>Receipt</title>
</head>
<body>
    <h2>Restaurant Receipt</h2>
    <p>Order ID: {{ $order->id }}</p>
    <p>Meja: {{ $order->table->number }}</p>
    <hr>
    <table width="100%" border="1" cellspacing="0" cellpadding="5">
        <tr>
            <th>Makanan</th>
            <th>Qty</th>
            <th>Harga</th>
            <th>Subtotal</th>
        </tr>
        @foreach($order->items as $item)
        <tr>
            <td>{{ $item->food->name }}</td>
            <td>{{ $item->quantity }}</td>
            <td>Rp. {{ number_format($item->price, 0, ',', '.') }}</td>
            <td>Rp. {{ number_format($item->subtotal, 0, ',', '.') }}</td>
        </tr>
        @endforeach
    </table>
    <hr>
    <h3>Total: Rp. {{ number_format($order->total_price, 0, ',', '.') }}</h3>
</body>
</html>