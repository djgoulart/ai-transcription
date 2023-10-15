import { DownloadList } from '@/components/DownloadList'
import { ScrollArea } from '@/components/ScrollArea'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-between px-4">
      <DownloadList />
    </main>
  )
}
