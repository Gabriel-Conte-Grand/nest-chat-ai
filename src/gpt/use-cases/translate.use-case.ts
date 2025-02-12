import OpenAI from 'openai'

interface Options {
  prompt: string
  lang: string
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Traduce el siguiente texto al idioma ${lang}:${prompt}
        
          `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4',
    temperature: 0.15,
  })

  return { message: response.choices[0].message.content }
}
