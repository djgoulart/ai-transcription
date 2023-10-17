'use client'

export function useAudio() {
  async function fetchAudio(fileName: string): Promise<string> {
    const fetchResponse = await fetch('/api/audio', {
      method: 'POST',
      body: JSON.stringify({ audioKey: fileName })
    })

    return await fetchResponse.json()
  }

  return { fetchAudio }
}
