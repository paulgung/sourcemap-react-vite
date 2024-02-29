import axios from "@/axios";

export const chatWithPrompt = async (prompts: string) => {
  return axios.post(
    "https://frontend.myhexin.com/kingfisher/robot/homeworkChat",
    {
      content: prompts,
      source: "homework-47-wangxiaolong",
      token: "610EE45BF-Qtc2VydmU=",
      temperature: 1,
    }
  );
};
