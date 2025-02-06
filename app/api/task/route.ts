const wayiAPI = "https://wayi.league-funny.com/api"

export async function GET() {
    const res = await fetch(`${wayiAPI}/task`)
    const data = await res.json()
    return Response.json(data)
}