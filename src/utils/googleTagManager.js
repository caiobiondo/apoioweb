export const events = {
  NEW_CUSTOMER: 'ev-novo-cliente',
  EDIT_CUSTOMER: 'ev-editar-cliente',
  SEARCH_CUSTOMER: 'ev-buscar-cliente',
  IMPORT_PRODUCT: 'ev-importar-produto',
  CHANGE_QUANTITY: 'ev-alterar-quantidade',
  COLLAPSE_ADD_BUTTON: 'ev-colapsar-botao-adicionar',
  EXPAND_ADD_BUTTON: 'ev-expandir-botao-adicionar',
  READ_MAGAZINE: 'ev-ver-revista',
  DOWNLOAD_MAGAZINE: 'ev-baixar-revista',
  START_TRAINING: 'ev-iniciar-treinamento',
  FINISH_TRAINING: 'ev-concluir-treinamento',
  TRAINING_EVALUATION: 'ev-avaliar-treinamento',
};

export const categories = {
  REGISTRATION: 'Cadastro',
  STOCK: 'Meu estoque',
  MAGAZINE: 'Revista',
  TRAINING: 'Treinamento',
};

export const actions = {
  NEW_REGISTRATION: 'Novo Cadastro',
  EDIT_REGISTRATION: 'Editar Cadastro',
  SEARCH_REGISTRATION: 'Buscar Cadastro',
  IMPORT: 'Importar',
  ADD: 'Adicionar',
  REMOVE: 'Remover',
  READ: 'Ver',
  DOWNLOAD: 'Baixar',
  START: 'Iniciar',
  FINISH: 'Concluir',
  EVALUATION: 'Avaliar',
};

export const labels = {
  CUSTOMER: 'Cliente',
};

export const gtmPushDataLayerEvent = event => {
  if (!window.dataLayer) {
    return;
  }

  window.dataLayer.push(event);
};
