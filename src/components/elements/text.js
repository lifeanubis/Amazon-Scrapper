/*
  ======================================

     /$$                           /$$
    | $$                          | $$
   /$$$$$$    /$$$$$$  /$$   /$$ /$$$$$$
  |_  $$_/   /$$__  $$|  $$ /$$/|_  $$_/
    | $$    | $$$$$$$$ \  $$$$/   | $$
    | $$ /$$| $$_____/  >$$  $$   | $$ /$$
    |  $$$$/|  $$$$$$$ /$$/\  $$  |  $$$$/
     \___/   \_______/|__/  \__/   \___/

   Usage: import text from "components/elements/text"

   and then you can use either of the functions mentioned
   below. You should also checkout the docs of
   dependencies that this file uses while working
   with it because they're very short and provide a
   much richer documentation.

  ======================================
*/

import R from "ramda"
import chalk from "chalk"
import boxen from "boxen"
import figlet from "figlet"
import link from "terminal-link"
import gradients from "gradient-string"
import chalkAnimation from "chalk-animation"
import cfonts from "cfonts"
import format from "cli-format"

export default {
  basic: chalk,
  link: link,
  format: format,
  gradient: {
    /*
      ======================================
        If you want to gradient-ify your
        strings, use one of these functions.
        You can pipe them and get some
        interesting behaviors as well. May
        not work well with animations though.
      ======================================
    */
    custom: gradients,
    teen: gradients.teen,
    mind: gradients.mind,
    vice: gradients.vice,
    fruit: gradients.fruit,
    atlas: gradients.atlas,
    retro: gradients.retro,
    summer: gradients.summer,
    pastel: gradients.pastel,
    rainbow: gradients.rainbow,
    cristal: gradients.cristal,
    morning: gradients.morning,
    passion: gradients.passion,
    instagram: gradients.instagram
  },
  animation: {
    /*
      ======================================
        Use some of these functions to create
        colorful animations on the terminal
        that support it. It doesn't work well
        if you pipe it with say gradient functions,
        so keep that in mind while using it.
      ======================================
    */
    neon: chalkAnimation.neon,
    pulse: chalkAnimation.pulse,
    radar: chalkAnimation.radar,
    glitch: chalkAnimation.glitch,
    karaoke: chalkAnimation.karaoke,
    rainbow: chalkAnimation.rainbow
  },
  heading(content) {
    /*
      ======================================
        This function returns a figlet header
        without a box surrounding it. If you
        want the box or gradient, you can pipe
        or compose these functions together because
        return values for all of these calls is a string.
      ======================================
    */
    return figlet.textSync(content, {
      font: "Standard",
      horizontalLayout: "fitted",
      verticalLayout: "default"
    })
  },
  fancy(content, options = {}) {
    return cfonts.render(content, {
      font: "tiny",
      align: "left",
      colors: ["system"],
      background: "transparent",
      letterSpacing: 1,
      lineHeight: 1,
      space: false,
      maxLength: "0",
      gradient: false,
      independentGradient: false,
      transitionGradient: false,
      env: "node",
      ...options
    }).string
  },
  boxed(string, options = {}) {
    /*
      ======================================
        This function optionally takes arguments
        and uses `boxen` package to create boxes
        surrounding some string in the terminal.
        You can pass in options to the call if you
        want to override default behavior. Look
        for boxen's npm docs to know how to do that.
      ======================================
    */
    return boxen(string, { padding: 1, borderStyle: "bold", ...options })
  },
  tag(string, options = {}) {
    /*
      ======================================
        This function returns a pipe of
        `boxed`` and `gradient`. So that means you'll
        get some colorful boxed string. Unlike
        `banner`, it doesn't turn the string big, so
        it can be seen as a tag. Useful in some cases.
      ======================================
    */
    const gradient = options.gradient ? options.gradient : "fruit"
    return R.pipe(
      string => this.basic(string),
      string =>
        this.boxed(string, {
          padding: { left: 1, right: 1, top: 0, bottom: 0 },
          borderStyle: "bold"
        }),
      string => this.gradient[gradient](string)
    )(string)
  },
  banner(string, options = {}) {
    /*
      ======================================
        This function is a pipe of some functions
        above and essentially it creates a big and
        boxed colorful header on the terminal.
      ======================================
    */
    const gradient = options.gradient ? options.gradient : "fruit"
    return R.pipe(
      string => this.basic(string),
      string => this.heading(string),
      string => this.boxed(string, { margin: { bottom: 1 } }),
      string => this.gradient[gradient](string)
    )(string)
  },
  poster(string, options = {}) {
    /*
      ======================================
        This function is a pipe of some functions
        above and essentially it creates a big and
        boxed colorful header on the terminal.
      ======================================
    */
    const gradient = options.gradient ? options.gradient : "yellow,blue"
    return R.pipe(
      string => this.basic(string),
      string => this.fancy(string, { gradient: gradient }),
      string => this.boxed(string, { margin: { bottom: 1 } })
    )(string)
  }
}
