"use client"

import { useState } from "react"
import { Button } from "@/components/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useStore } from "@/store"
import { useVideo } from "@/hooks/useVideo"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


const formSchema = z.object({
  videoId: z.string().min(3, {
    message: "VideoId must be at least3 characters.",
  }),
})

export function VideoForm() {
  const {addVideo, addVideoInfo, videoInfoRequestCompleted} = useStore()
  const {fetchInfo, fetchVideoFile} = useVideo()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoId: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({videoId}: z.infer<typeof formSchema>) {
    setIsLoading(true)
    addVideo({
      id: videoId, 
      downloaded: false, 
      downloading: false, 
      isRequestingInfo: true, 
      hasInfo: false
    })

    const info = await fetchInfo(videoId)
    if(info) {
      addVideoInfo(videoId, {...info})
    }
    videoInfoRequestCompleted(videoId)
    form.reset()
    setIsLoading(false)

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 w-full items-center">
        <FormField
          control={form.control}
          name="videoId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit" loading={isLoading} disabled={isLoading}>Submit</Button>
      </form>
    </Form>
  )
}
