import text from "@/components/elements/text"
import prompt from "@/components/elements/prompt"

export default async settings => {
  /*
    ======================================

      This function prints out the banner
      first, from the information provided
      in `application.yaml` file. Then
      it questions the user based on a file inside settings and
      calls the default script specified inside
      `scripts` folder: passing it the answers that
      user has given to those questions.

      Whether or not things don't work inside that function,
      it exits out printing the exit message.

    ======================================
  */
  const { options, data } = settings
  const { application, configuration } = data

  const intro = application.messages.intro ? text.poster(application.messages.intro) : null
  const outro = application.messages.outro ? text.basic.dim(`\n${application.messages.outro}`) : null
  if (intro) console.log(intro)

  try {
    const answers = await prompt(
      configuration.options.map(option => option.question)
    )
    answers["version"] = application.version
    await options(answers)
  } finally {
    if (outro) console.log(outro)
    process.exit()
  }
}
