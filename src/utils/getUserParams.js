import { Origem } from 'config';

export const getCycleIdFromUser = user => {
  return (
    user &&
    user.estrutura &&
    user.estrutura.ciclo &&
    user.estrutura.ciclo[0] &&
    user.estrutura.ciclo[0].numero &&
    String(user.estrutura.ciclo[0].numero)
  );
};

export const getCommercialStructureIdFromUser = user => {
  return user && user.estrutura && user.estrutura.codigo;
};

export const getCommercialStructureTypeIdFromUser = user => {
  return user && user.estrutura && user.estrutura.codigoTipo;
};

export const getCommercialRegionIdFromUser = user => {
  return (
    user &&
    user.estrutura &&
    user.estrutura.regiaoEstrategica &&
    user.estrutura.regiaoEstrategica.codigo &&
    Number(user.estrutura.regiaoEstrategica.codigo)
  );
};

export const getSalesManagementIdFromUser = user => {
  return (
    user && user.estrutura && user.estrutura.gerenciaVenda && user.estrutura.gerenciaVenda.codigo
  );
};

export const getHeadersFromUser = user => {
  return {
    ciclo: user.estrutura.ciclo.length > 0 ? user.estrutura.ciclo[0].numero : 0,
    grupo: user.estrutura.codigoTipo > 4 ? user.estrutura.codigo : 0,
    gerenciaDeVendas: user.estrutura.codigoTipo > 2 ? user.estrutura.gerenciaVenda.codigo : 0,
    regiao: user.estrutura.codigoTipo > 1 ? user.estrutura.regiaoEstrategica.codigo : 0,
    setor: user.estrutura.codigoTipo > 3 ? user.estrutura.setor.codigo : 0,
    gerenciaMercado: user.estrutura.gerenciaMercado.codigo,
    papelDaConsultora: user.cdPapelAtivo,
    canal: user.cdCanalCaptacao,
    origem: Origem,
    sellerId: user.codigo,
  };
};
