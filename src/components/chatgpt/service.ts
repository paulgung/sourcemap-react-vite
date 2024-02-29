import axios from "@/axios";

// 环境判断
const isDev = process.env.NODE_ENV === 'development'
const baseURL = isDev ? 'http://yapi.myhexin.com/yapi/mock_v2/313124' : '//paas.myhexin.com/occ-gpt'

// GPT接口
export const sseUrl = `${baseURL}/openai/chat/v1/ask`

// 获取gpt对话id接口
const getChatIdUrl = `${baseURL}/openai/chat/v1/dialog`

// 获取gpt对话id
export const getChatId = (): Promise<{ dialogId: string }> =>
  axios.get(getChatIdUrl)
