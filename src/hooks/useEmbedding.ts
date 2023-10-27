'use client'

export function useEmbedding() {
  async function createEmbedding(text: string): Promise<void> {
    const fetchResponse = await fetch('/api/embedding', {
      method: 'POST',
      body: JSON.stringify({ text })
    })

    return await fetchResponse.json()
  }
  return {createEmbedding}
}