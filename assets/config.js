/*
 * Configuração central da landing page da Green Energy.
 * Edite aqui contatos e textos de atendimento. O restante da página lê estes valores.
 */
window.SITE_CONFIG = {
  company: "Green Energy",

  instagram: {
    handle: "@greenenergy.24",
    url: "https://www.instagram.com/greenenergy.24/",
  },

  whatsapp: {
    // PENDENTE: número com DDI + DDD, apenas dígitos. Exemplo de formato: "5567900000000".
    // Enquanto estiver vazio, os botões levam ao formulário e o site indica o Instagram como alternativa.
    // O link do Instagram (wa.me/message/...) não aceita mensagem pré-preenchida, por isso o número é necessário.
    number: "",
    message:
      "Olá! Vi o site da Green Energy e gostaria de solicitar um orçamento de energia solar. Estou em [cidade].",
  },

  // Conferir com a empresa: o perfil mostra "Rua Elsei Fujinaka, 1770 - Jardim dos Cristhais";
  // os diretórios de CEP registram a grafia "Rua Eisei Fujinaka", bairro "Jardim Cristhais".
  address: {
    street: "Rua Eisei Fujinaka, 1770",
    district: "Jardim Cristhais",
    city: "Dourados – MS",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Eisei+Fujinaka+1770+Dourados+MS",
  },

  region: "Dourados e região",
};
