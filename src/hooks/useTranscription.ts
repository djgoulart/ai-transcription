'use client'

export function useTranscription() {
  async function fetchTranscription(fileName: string): Promise<{transcription: string}> {
    const fetchResponse = await fetch('/api/wisper', {
      method: 'POST',
      body: JSON.stringify({ fileName })
    })

    return await fetchResponse.json()
  }
  return {fetchTranscription}
}