import { fetchEventSource } from '@microsoft/fetch-event-source'
import type { MessageItem } from './interface'
import { getChatId, sseUrl } from './service'

interface Choice {
  finish_reason: string
  delta: {
    content: string
    cmpStatus: string
  }
}

const controller = new AbortController()
const { signal } = controller

let content = ''

// 处理SSE消息
const handleMessage = (res: any, setStateFunction: any, setLoading?: any) => {
  setLoading(false)
  const messageItem = JSON.parse(res.data) as MessageItem
  const choices = messageItem.choices as Choice[]
  // 兼容新消息 可能会没有choices
  if (!choices?.length) return

  const firstChoice = choices[0]

  if (['stop', 'length', 'error'].includes(firstChoice.finish_reason)) {
    controller.abort()
    content = ''
  } else {
    // 处理消息内容
    content += firstChoice.delta.content
    setStateFunction(content)
    if (firstChoice.delta.cmpStatus === 'error') {
      controller.abort()
      content = ''
    }
  }
}

export const ChatWithPrompt = async (prompts: string, setStateFunction: any, setLoading?: any) => {
  const { dialogId } = await getChatId()
  const formData = new FormData()

  // 需传递三个参数: 模型类型; dialogId; 问句内容
  formData.append('model', 'pass')
  formData.append('dialogId', dialogId)
  formData.append('content', prompts)

  fetchEventSource(sseUrl, {
    method: 'POST',
    body: formData,
    signal,
    openWhenHidden: true,
    onopen() {
      return Promise.resolve()
    },
    onerror(error: Event) {
      window.console.log('Chat GPT ERROR:', error)
      content = ''
    },
    onmessage(res) {
      handleMessage(res, setStateFunction, setLoading)
    },
  })
}

