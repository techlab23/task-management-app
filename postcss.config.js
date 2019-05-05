const purgecss = require("@fullhuman/postcss-purgecss")

module.exports = {
 plugins: [
  //Only add purgecss in production

  process.env.NODE_ENV === "production"
   ? purgecss({
      content: ["./src/**/*.vue"]
     })
   : ""
 ]
}
