'use client'

import React, { useEffect }  from 'react'
import { ScrollArea } from '../ScrollArea'
import { useStore } from '@/store'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from '../Button'

export function TranscriptionList() {
  return (
    <div className="w-full max-w-lg mt-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Transcriptions
          </CardTitle>
          <CardDescription>List of Transcriptions ready to ingest</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-screen max-h-[720px] mt-4">
            <div className="flex flex-col gap-2">
              
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className='justify-end'>
          <Button>Start AI Ingestion</Button>
        </CardFooter>
      </Card>
    </div>
  )

}