import OpenAI from 'openai'

interface Options {
  prompt: string
  maxToken?: number
}

export const prosConsDiscusserStreamUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options

  return await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras sofisticados,
la respuesta debe de ser en formato markdown,
los pros y contras deben de estar en una lista,
          
          `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4',
    stream: true,
    temperature: 0.15,
    // max_tokens: maxToken,
  })
}
