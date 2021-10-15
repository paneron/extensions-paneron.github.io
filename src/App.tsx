import makeApp from '@riboseinc/paneron-website-common/scaffolding/makeApp'


export default makeApp({
  title: "Paneron extension directory",
  topBarIsHeader: true,
  topLinks: [{
    text: "Paneron",
    target: "https://paneron.org/",
    external: true,
  }, {
    text: "Extensions",
    target: "/",
  }],
});
