const replaceTemplate = (template, product) => {
  return template
    .replace(/<% NAME %>/g, product.name)
    .replace(/<% IMAGE %>/g, product.image)
    .replace(/<% DESCRIPTION %>/g, product.description);
};

module.exports = replaceTemplate;
