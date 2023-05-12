import template from "./../public/template/index.mjs";

const data = {
  title: "sub-template demo",
  features: [
    "Template files are compiled into NodeJS modules and in-memory cached",
    "Partials and compiled partials",
    "Short-hand for <i>exists</i> statement",
    "Short-hand for <i>non-exists or empty</i> statement",
    "Short-hand for <i>loops</i>",
    "Every thing you can do with Javascript",
    "Ultra small size",
  ],
};

export const config = {
  runtime: "edge",
};

export default (request) => {
  var result = template(data);
  return new Response(result, {
    headers: { "content-type": "text/html" },
  });
};
