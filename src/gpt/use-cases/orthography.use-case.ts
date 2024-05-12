import OpenAI from 'openai'

interface Options {
  prompt: string
  // maxToken?: number
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Te seran proveidos textos en español con posibles errores ortograficos y gramaticales, 
          debes de responder en formato JSON,
          tu tarea es corregirlos y retornar soluciones,
          tambien debes de dar un porcentaje de acierto en base a posibles errores del usuario,

          Si no hay errores, devuelve un mensaje de felicitaciones
          
          Ejemplo de salida:
          {
            userScore: number,
            errors: string[], // ['error -> solucion']
            message: string, // Usa emojis y textos para felicitar al usuario
          }
          
          
          
          `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.15,
    max_tokens: 150,
    response_format: {
      type: 'json_object', // NOTA: NO todos los 'modelos'  soportan json
    },
  })

  const jsonResp = JSON.parse(completion.choices[0].message.content)

  return jsonResp
}
