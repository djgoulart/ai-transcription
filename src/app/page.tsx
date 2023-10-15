import { AudioList } from '@/components/AudioList'
import { DownloadList } from '@/components/DownloadList'
import { TranscriptionList } from '@/components/TranscriptionList'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center px-4">
      <div className='flex flex-row justify-start gap-4'>
        <DownloadList />
        <AudioList />
        <TranscriptionList />
      </div>
    </main>
  )
}
