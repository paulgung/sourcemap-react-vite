import axios from "@/axios";
interface IChatWithPrompt {
  res: string;
}
interface IGetAlertInfo {
  service: string;
  from: string | number;
  to: string | number;
}

// promt gpt
export const chatWithPrompt = async (
  prompts: string
): Promise<IChatWithPrompt> => {
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

export const getAlertInfo = async (
  params: IGetAlertInfo
): Promise<IChatWithPrompt> => {
  return axios.post(
    "https://apm.myhexin.com/elk/mobile-archive-am-skywalking-log-json-*/_search",
    {
      query: {
        bool: {
          must: [
            {
              term: {
                service: params.service,
              },
            },
            {
              range: {
                log_time: {
                  gte: Number(params.from),
                  lte: Number(params.to),
                },
              },
            },
          ],
        },
      },
    }
  );
};
