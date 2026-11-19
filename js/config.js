/**
 * ============================================================
 *  DAIRON CELL — DADOS DA EMPRESA
 * ============================================================
 *  Este é o ÚNICO arquivo que você precisa editar para atualizar
 *  contatos, endereço, horário e mapa do site.
 *
 *  Campos com valor "" (vazio) aparecem no site como
 *  "A confirmar" — nada é inventado.
 * ============================================================
 */
window.DAIRON_CONFIG = {
  /* Nome exibido em textos automáticos */
  nome: "Dairon Cell",

  /* WhatsApp no formato internacional, só números (55 + DDD + número).
     Confirmado no link da bio do Instagram: wa.me/5533999360317 */
  whatsapp: "5533999360317",

  /* Mensagem padrão do botão flutuante e dos botões gerais */
  mensagemPadrao: "Olá, Dairon Cell! Vim pelo site e gostaria de fazer um pedido.",

  /* Instagram (sem @) */
  instagram: "daironcell",

  /* Foto real do iPhone no banner principal.
     Coloque a foto na pasta assets/img/ e escreva o caminho abaixo.
     Enquanto estiver vazio, o site mostra a ilustração.
     Melhor resultado: PNG com fundo transparente ou foto com fundo escuro,
     na vertical, com pelo menos 1000 px de altura. */
  fotoDestaque: "assets/img/iphone-17.png",

  /* ---------- DADOS A CONFIRMAR COM A EMPRESA ---------- */

  /* Ex.: "Rua Exemplo, 123 – Centro, Cidade – MG, 00000-000" */
  endereco: "Praça Getúlio Vargas - Centro, Caratinga - MG, 35300-034",

  /* Lista de horários. Ex.:
     [
       { dias: "Segunda a sexta", horas: "09h às 18h" },
       { dias: "Sábado",          horas: "09h às 13h" }
     ] */
  horarios: [],

  /* Link "src" do iframe do Google Maps (gratuito).
     Google Maps → Compartilhar → Incorporar um mapa → copie só o endereço do src.
     Ex.: "https://www.google.com/maps/embed?pb=..." ou
     "https://maps.google.com/maps?q=ENDERECO&output=embed" */
  mapaEmbed: "https://maps.google.com/maps?q=Pra%C3%A7a%20Get%C3%BAlio%20Vargas%2C%20Centro%2C%20Caratinga%20-%20MG%2C%2035300-034&z=17&output=embed",

  /* Link para abrir a rota no Google Maps. Ex.: "https://maps.app.goo.gl/..." */
  mapaLink: "https://www.google.com/maps/search/?api=1&query=Dairon%20Cell%2C%20Pra%C3%A7a%20Get%C3%BAlio%20Vargas%2C%20Centro%2C%20Caratinga%20-%20MG%2C%2035300-034",

  /* E-mail (opcional) */
  email: ""
};
