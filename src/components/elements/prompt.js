/*
  ======================================
                                                           /$$
                                                          | $$
    /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$/$$$$   /$$$$$$  /$$$$$$
   /$$__  $$ /$$__  $$ /$$__  $$| $$_  $$_  $$ /$$__  $$|_  $$_/
  | $$  \ $$| $$  \__/| $$  \ $$| $$ \ $$ \ $$| $$  \ $$  | $$
  | $$  | $$| $$      | $$  | $$| $$ | $$ | $$| $$  | $$  | $$ /$$
  | $$$$$$$/| $$      |  $$$$$$/| $$ | $$ | $$| $$$$$$$/  |  $$$$/
  | $$____/ |__/       \______/ |__/ |__/ |__/| $$____/    \___/
  | $$                                        | $$
  | $$                                        | $$
  |__/                                        |__/

    Usage:

    import prompts from "components/elements/prompts"
    const answers = await prompts(<questions>)

    To figure out the structure of 'questions'
    and available types, checkout npm docs for enquirer here:
    https://www.npmjs.com/package/enquirer

  ======================================
*/

import Enquirer from "enquirer"
const enquirer = new Enquirer()

const prompter = questions => enquirer.prompt(questions)
export default async questions => await prompter(questions)
