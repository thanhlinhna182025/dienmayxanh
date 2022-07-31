const TechniqualInfoProduct = {
  render: (singleProduct) => {
    const techniqual = Object.entries(singleProduct.techniqual);
    console.log(techniqual);
    return `
    <div class="techniqual__info">
        <h2>Thông số kỹ thuật ${singleProduct.name}</h2>
        <ul class="techniqual__info-list">
            ${techniqual
              .map(
                ([key, val] = entry) =>
                  `<li class="techniqual__info-item"><span class="title">${key} :</span><span class="content">${val}</span></li>`
              )
              .join("\n")}
        </ul>
    </div>`;
  },
};
export default TechniqualInfoProduct;
