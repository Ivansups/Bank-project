export async function GET() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 3600,
            },
        })

        if (!res.ok){
            return new Response('Failed to fetch exchange rate', { status: 500 });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error){
        console.error('Error fetching exchange rate:', error);
        return new Response('Failed to fetch exchange rate', { status: 500 });
    }
}