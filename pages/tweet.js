import { getToken } from "next-auth/jwt"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  const token = await getToken({ req })
  if (!token?.accessToken) {
    return res.status(401).json({ success: false, error: "Not authenticated" })
  }

  const response = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: "hi" }),
  })

  if (!response.ok) {
    const err = await response.json()
    return res.status(500).json({ success: false, error: err })
  }

  const data = await response.json()
  res.status(200).json({ success: true, tweet: data })
}
